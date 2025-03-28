import JobApplicationForm from '@/components/JobApplication'
import JobCard from '@/components/JobCard'
import JobTypeDropdown from '@/components/JobTypeDropdown'
import LocationDropdown from '@/components/LocationDropdown'
import SalarySlider from '@/components/SalarySlider'
import SearchBar from '@/components/SearchBar'
import { jobTypes, locations } from '@/constants'
import AppHeader from '@/layout/AppHeader'
import { createJob, fetchAllJobApplications } from '@/services/api'
import '@/styles/filters.css'
import { JobApplication } from '@/types'
import { Button, Empty, Layout, message, Spin } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React, { useEffect, useMemo, useState } from 'react'
import '@/styles/home.css'

const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [location, setLocation] = useState<string | null>(null)
    const [jobType, setJobType] = useState<string | null>(null)
    const [salaryRange, setSalaryRange] = useState<[number, number]>([
        50000, 80000,
    ])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [jobs, setJobs] = useState<JobApplication[]>([])
    const [loading, setLoading] = useState(false)

    const fetchJobs = async () => {
        setLoading(true)
        const { data, error } = await fetchAllJobApplications()
        if (error) {
            message.error('Failed to fetch jobs')
        } else if (data) {
            setJobs(data)
        }

        setLoading(false)
    }

    const handleCreateJob = async (jobData: Omit<JobApplication, 'id'>) => {
        const { error } = await createJob(jobData)
        if (error) {
            message.error('Failed to create job')
            return false
        } else {
            message.success('Job created successfully')
            fetchJobs()
            setIsModalVisible(false)
            return true
        }
    }

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch = job.title
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            const matchesLocation =
                !location ||
                job.location.toLowerCase().includes(location.toLowerCase())
            const matchesJobType =
                !jobType ||
                job.jobType.toLowerCase().includes(jobType.toLowerCase())

            const jobMinMonthly = job.salaryFrom / 12
            const jobMaxMonthly = job.salaryTo / 12

            const matchesSalary =
                jobMinMonthly <= salaryRange[1] &&
                jobMaxMonthly >= salaryRange[0]

            return (
                matchesSearch &&
                matchesLocation &&
                matchesJobType &&
                matchesSalary
            )
        })
    }, [jobs, searchValue, location, jobType, salaryRange])

    const handleResetFilters = () => {
        setSearchValue('')
        setLocation(null)
        setJobType(null)
        setSalaryRange([50000, 80000])
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const hasActiveFilters =
        searchValue ||
        location ||
        jobType ||
        salaryRange[0] !== 50000 ||
        salaryRange[1] !== 80000

    return (
        <Layout>
            <Header
                className="header"
                style={{
                    padding: '20px 0',
                    backgroundColor: '#FFFFFF',
                    height: '100%',
                    lineHeight: 0,
                }}
            >
                <AppHeader onClickCreateJob={() => setIsModalVisible(true)} />
                <div className="filters">
                    <SearchBar value={searchValue} onChange={setSearchValue} />
                    <LocationDropdown
                        value={location}
                        options={locations}
                        onChange={setLocation}
                    />
                    <JobTypeDropdown
                        value={jobType}
                        options={jobTypes}
                        onChange={setJobType}
                    />
                    <SalarySlider
                        min={30000}
                        max={150000}
                        value={salaryRange}
                        onChange={setSalaryRange}
                    />
                    <Button
                        type="primary"
                        onClick={handleResetFilters}
                        style={{
                            marginLeft: 40,
                        }}
                        disabled={!hasActiveFilters}
                    >
                        Reset
                    </Button>{' '}
                </div>
            </Header>
            <Content
                className="content"
                // style={{ padding: '40px 100px', justifyContent: 'center', alignItems: 'center' }}
            >
                <Spin spinning={loading}>
                    <JobApplicationForm
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        onFinish={handleCreateJob}
                    />
                    {filteredJobs.length > 0 ? (
                        <div className="jobs-container">
                            {filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <Empty
                            description="No jobs found matching your criteria"
                            style={{ margin: '40px 0' }}
                        />
                    )}
                </Spin>
            </Content>
        </Layout>
    )
}

export default Home
