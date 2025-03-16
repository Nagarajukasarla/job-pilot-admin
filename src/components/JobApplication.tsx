import { locations, jobTypes } from '@/constants'
import { getDraft, saveDraft } from '@/utils/localStorage'
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DownOutlined,
} from '@ant-design/icons'
import {
    Button,
    Col,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const { TextArea } = Input

interface JobApplicationProps {
    visible: boolean
    onClose: () => void
    onFinish: (jobData: any) => void
}

const JobApplicationForm: React.FC<JobApplicationProps> = ({
    visible,
    onClose,
    onFinish,
}) => {
    const [form] = Form.useForm()
    const [salaryFrom, setSalaryFrom] = useState<number>(0)
    const [salaryTo, setSalaryTo] = useState<number>(1200000)

    const validateSalaryRange = (_: any, value: number) => {
        if (!value) return Promise.resolve()

        if (_.field === 'salaryFrom') {
            const maxSalary = form.getFieldValue('salaryTo')
            if (maxSalary && value > maxSalary) {
                return Promise.reject(
                    'Min salary should be less than max salary'
                )
            }
        } else {
            const minSalary = form.getFieldValue('salaryFrom')
            if (minSalary && value < minSalary) {
                return Promise.reject(
                    'Max salary should be greater than min salary'
                )
            }
        }
        return Promise.resolve()
    }

    useEffect(() => {
        const draft = getDraft()
        if (draft) {
            const formData = {
                ...draft,
                deadline: draft.deadline ? dayjs(draft.deadline) : undefined,
            }
            form.setFieldsValue(formData)
            if (draft.salaryFrom && draft.salaryTo) {
                setSalaryFrom(draft.salaryFrom)
                setSalaryTo(draft.salaryTo)
            }
        }
    }, [visible])

    const handleSaveDraft = () => {
        const values = form.getFieldsValue()
        const formData = {
            ...values,
            salaryFrom,
            salaryTo,
            deadline: values.deadline?.toISOString(),
        }
        saveDraft(formData)
    }

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={750}
        >
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
                Create Job Opening
            </h2>
            <Form
                form={form}
                layout="vertical"
                requiredMark="optional"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Job Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter job title',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter job title"
                                style={{ padding: '12px 10px' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Company Name"
                            name="company"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter company name',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Amazon, Microsoft, Swiggy"
                                style={{ padding: '12px 10px' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    paddingSM: 12,
                                    controlHeight: 50,
                                    fontSize: 16,
                                },
                            }}
                        >
                            <Form.Item
                                label="Location"
                                name="location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select location',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Choose Preferred Location"
                                    options={locations.map((city) => {
                                        return {
                                            label: city,
                                            value: city,
                                        }
                                    })}
                                />
                            </Form.Item>
                        </ConfigProvider>
                    </Col>
                    <Col span={12}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    paddingSM: 12,
                                    controlHeight: 50,
                                    fontSize: 16,
                                },
                            }}
                        >
                            <Form.Item
                                label="Job Type"
                                name="jobType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select job type',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select job type"
                                    options={jobTypes.map((type) => {
                                        return {
                                            label: type,
                                            value: type,
                                        }
                                    })}
                                />
                            </Form.Item>
                        </ConfigProvider>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Salary Range">
                            <div
                                className="salary-range"
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                }}
                            >
                                <Form.Item
                                    name="salaryFrom"
                                    rules={[
                                        { required: true, message: 'Required' },
                                        { validator: validateSalaryRange },
                                    ]}
                                    style={{
                                        display: 'inline-block',
                                        margin: 0,
                                    }}
                                >
                                    <Input
                                        type="number"
                                        prefix={
                                            <span style={{ marginRight: 5 }}>
                                                <ArrowUpOutlined
                                                    style={{
                                                        marginRight: 0.2,
                                                        color: '#d1d1d1',
                                                    }}
                                                />
                                                <ArrowDownOutlined
                                                    style={{ color: '#d1d1d1' }}
                                                />
                                            </span>
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value
                                                ? Number(e.target.value)
                                                : undefined
                                            setSalaryFrom(value || 0)
                                            form.setFieldValue(
                                                'salaryFrom',
                                                value
                                            )
                                            form.validateFields(['salaryTo'])
                                        }}
                                        style={{
                                            width: 150,
                                            padding: '12px 10px',
                                        }}
                                        placeholder="From"
                                    />
                                </Form.Item>
                                <span>-</span>
                                <Form.Item
                                    name="salaryTo"
                                    rules={[
                                        { required: true, message: 'Required' },
                                        { validator: validateSalaryRange },
                                    ]}
                                    style={{
                                        display: 'inline-block',
                                        margin: 0,
                                    }}
                                >
                                    <Input
                                        type="number"
                                        prefix={
                                            <span style={{ marginRight: 5 }}>
                                                <ArrowUpOutlined
                                                    style={{
                                                        marginRight: 0.2,
                                                        color: '#d1d1d1',
                                                    }}
                                                />
                                                <ArrowDownOutlined
                                                    style={{ color: '#d1d1d1' }}
                                                />
                                            </span>
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value
                                                ? Number(e.target.value)
                                                : undefined
                                            setSalaryTo(value || 0)
                                            form.setFieldValue(
                                                'salaryTo',
                                                value
                                            )
                                            form.validateFields(['salaryFrom'])
                                        }}
                                        style={{
                                            width: 150,
                                            padding: '12px 10px',
                                        }}
                                        placeholder="To"
                                    />
                                </Form.Item>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Application Deadline" name="deadline">
                            <DatePicker
                                style={{ width: '100%', padding: '12px 10px' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Job Description" name="description">
                    <TextArea
                        rows={4}
                        placeholder="Please share a description about the job role"
                        style={{
                            padding: 10,
                        }}
                    />
                </Form.Item>

                <div
                    className="form-buttons"
                    style={{ textAlign: 'right', marginTop: 20 }}
                >
                    <Button
                        icon={<DownOutlined />}
                        className="draft-btn"
                        style={{ marginRight: 10 }}
                        onClick={handleSaveDraft}
                    >
                        Save Draft
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Publish »
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default JobApplicationForm
