import { UserOutlined } from '@ant-design/icons'
import { ConfigProvider, Select } from 'antd'
import React from 'react'

const { Option } = Select

interface Props {
    value: string | null
    options: string[]
    onChange: (value: string) => void
}

const JobTypeDropdown: React.FC<Props> = ({ value, options, onChange }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBorder: '#FFFFFF',
                    paddingSM: 12,
                    controlHeight: 40,
                    fontSize: 16,
                },
            }}
        >
            <div className="filter-item">
                <Select
                    prefix={
                        <UserOutlined
                            style={{
                                marginRight: 15,
                            }}
                        />
                    }
                    value={value}
                    onChange={onChange}
                    placeholder="Job Type"
                    className="custom-dropdown"
                    style={{
                        width: 320,
                        border: 'none',
                    }}
                >
                    {options.map((loc) => (
                        <Option key={loc} value={loc}>
                            {loc}
                        </Option>
                    ))}
                </Select>
            </div>
        </ConfigProvider>
    )
}

export default JobTypeDropdown
