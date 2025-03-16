import React from 'react'
import { ConfigProvider, Slider } from 'antd'
import { Color } from 'antd/es/color-picker'

interface Props {
    min: number
    max: number
    value: [number, number]
    onChange: (values: [number, number]) => void
}

const SalarySlider: React.FC<Props> = ({ min, max, value, onChange }) => {
    const formatSalary = (value: number) => `₹${(value / 1000).toFixed(0)}K`

    return (
        <div className="filter-item salary-slider">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 10px',
                }}
            >
                <span
                    style={{
                        textAlign: 'start',
                        marginRight: 90,
                    }}
                >
                    Salary Per Month
                </span>
                <span
                    style={{
                        textAlign: 'end',
                    }}
                >
                    {formatSalary(value[0])} - {formatSalary(value[1])}
                </span>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Slider: {
                            handleColor: 'black',
                            handleActiveColor: 'black',
                            handleActiveOutlineColor: 'black',
                            handleSizeHover: 8,
                            trackHoverBg: 'black',
                        },
                    },
                }}
            >
                <Slider
                    range
                    value={value}
                    onChange={(values) => onChange(values as [number, number])}
                    min={min}
                    max={max}
                    style={{
                        width: 320,
                        color: 'black',
                    }}
                    tooltip={{
                        formatter(value) {
                            return formatSalary(value || 0)
                        },
                    }}
                    styles={{
                        track: {
                            backgroundColor: 'black',
                        },
                        rail: {
                            backgroundColor: '#E0E0E0',
                        },
                    }}
                />
            </ConfigProvider>
        </div>
    )
}

export default SalarySlider
