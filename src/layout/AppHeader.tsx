import logo from '@/assets/logo.png'
import { Avatar, Button, Menu, Space, Typography } from 'antd'
import React from 'react'
import '@/styles/appHeader.css'

interface AppHeaderProps {
    onClickCreateJob: () => void
}

const { Text } = Typography

const menuItems = [
    {
        key: '1',
        label: <Text>Home</Text>,
    },
    {
        key: '2',
        label: <Text>Find Jobs</Text>,
    },
    {
        key: '3',
        label: <Text>Find Talents</Text>,
    },
    {
        key: '4',
        label: <Text>About us</Text>,
    },
    {
        key: '5',
        label: <Text>Testimonials</Text>,
    },
]
const AppHeader: React.FC<AppHeaderProps> = ({ onClickCreateJob }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '40px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '840px',
                height: '80px',
                margin: '0 auto',
                padding: '0 30px 0 20px',
            }}
        >
            <Avatar
                size={53}
                src={logo}
                alt="Logo"
                style={{
                    flexShrink: 0,
                    marginRight: '15px',
                }}
            />
            <Menu
                mode="horizontal"
                items={menuItems}
                className="custom-menu"
                style={{
                    borderBottom: 'none',
                    flex: 1,
                    justifyContent: 'center',
                    display: 'flex',
                    gap: '10px',
                    backgroundColor: 'transparent',
                }}
            />
            <Space
                style={{
                    marginLeft: 10,
                }}
            >
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    style={{
                        background:
                            'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
                        color: '#FFFFFF',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '600',
                        borderRadius: '50px',
                        padding: '10px 20px',
                    }}
                    onClick={onClickCreateJob}
                >
                    Create Jobs
                </Button>
            </Space>
        </div>
    )
}

export default AppHeader
