import logo from '@/assets/logo.png'
import '@/styles/jobCard.css'
import { BankOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import { JobApplication } from '@/types'
import { useIsFirefox } from '@/hooks/useIsFirefox'

interface JobCardProps {
    job: JobApplication
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const isFirefox = useIsFirefox()

    return (
        <Card
            className="job-card"
            styles={{
                body: {
                    padding: 15,
                    height: isFirefox ? undefined : '265px',
                    overflow: 'hidden',
                },
            }}
        >
            <div className="job-card-header">
                <img src={logo} alt="Company Logo" className="company-logo" />
                <div className="time-tag">
                    <Typography.Text>24h ago</Typography.Text>
                </div>
            </div>

            <h3 className="job-title" title={job.title}>
                {job.title}
            </h3>

            <div className="job-details">
                <span>
                    <UserOutlined /> 1-3 yr Exp
                </span>
                <span>
                    <HomeOutlined /> {job.jobType}
                </span>
                <span>
                    <BankOutlined /> {(job.salaryTo / 100000).toFixed(0)}LPA
                </span>
            </div>

            <div className="job-description-container">
                <ul className="job-description">
                    {job.description.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>

            <Button type="primary" className="apply-btn">
                Apply Now
            </Button>
        </Card>
    )
}

export default JobCard
