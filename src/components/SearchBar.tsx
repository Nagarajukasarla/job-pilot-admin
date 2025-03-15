import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React from 'react'

interface Props {
    value: string
    onChange: (value: string) => void   
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {

    return (
        <div className="filter-item search">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search By Job Title, Role"
                prefix={<SearchOutlined style={{ marginRight: '10px' }} />}
                className="custom-input"
                style={{
                    width: 300,
                }}
            />
        </div>
    )
}

export default SearchBar
