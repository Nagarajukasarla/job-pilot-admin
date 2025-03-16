import logo from '@/assets/logo.png'
import '@/styles/jobCard.css'
import { BankOutlined, UserOutlined } from '@ant-design/icons'
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
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 384 512"
                        style={{ width: '14px', height: '14px', marginRight: '2px' }}
                        fill="#808080"  // This sets the color to gray
                    >
                        <path d="M64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l80 0 0-64c0-26.5 21.5-48 48-48s48 21.5 48 48l0 64 80 0c8.8 0 16-7.2 16-16l0-384c0-8.8-7.2-16-16-16L64 48zM0 64C0 28.7 28.7 0 64 0L320 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm88 40c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48zM232 88l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48zm144-16l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48c0-8.8 7.2-16 16-16z"/>
                    </svg> Onsite
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
