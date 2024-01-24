import { Text } from '@/components/text'
import { TextIcon } from '@/components/text-icon'
import { User } from '@/graphql/schema.types'
import { getDateColor } from '@/utilities'
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Dropdown, Tag, theme } from 'antd'
import { MenuProps } from 'antd/lib'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'

type ProjectCardProps = {
    id: string,
    title: string,
    updatedAt: string,
    dueDate?: string
    users?: {
        id: string,
        name: string,
        avatarUrl?: User['avatarUrl'],
    }[]   
}

const ProjectCard = ({ id, title, dueDate, users}: ProjectCardProps) => {

    const { token } = theme.useToken()
    const Edit = () => {
        console.log('Edit')
    }

    const dropdownItems = useMemo (() => {
        const dropdownItems: MenuProps['items'] = [
            {
                label: 'View card',
                key: '1',
                icon: <EyeOutlined />,
                onClick: () => {
                    Edit()
                }
            },
            {
                danger: true,
                label: 'Delete card',
                key: '2',
                icon: <DeleteOutlined />,
                onClick: () => {
                    
                }
            }
        ]
        
        return dropdownItems
    },[])

    const dueDateOptions = useMemo(() => {

        if(!dueDate) {
            return null
        }

        const date = dayjs(dueDate)
        return {
            color: getDateColor({ date: dueDate }) as string,
            text: date.format('MMM DD'),
        }

    }, [dueDate]);

  return (
    <ConfigProvider
        theme={{
            components: {
                Tag: {
                    colorText: token.colorTextSecondary,
                },
                Card: {
                    headerBg: 'transparent',
                }

            }
        }}
    >
        <Card
            size='small'
            title={<Text ellipsis={{tooltip: title}}>{title}</Text>}
            onClick={() => Edit()}
            extra={
                <Dropdown
                    trigger={['click']}
                    menu={{
                        items: dropdownItems,
                    }}
                    placement='bottom'
                    arrow={{ pointAtCenter: true }}
                >
                    <Button
                        type='text'
                        icon={<MoreOutlined style={{transform: 'rotate(90deg)'}} />}
                        shape='circle'
                        onPointerDown={(e) =>  {
                            e.stopPropagation()
                        }}
                        onClick={(e) =>  {
                            e.stopPropagation()
                        }}

                    />
                </Dropdown>
            }
        >
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <TextIcon style={{marginRight: '4px'}}  />
                {dueDateOptions && (
                    <Tag
                        icon= { <ClockCircleOutlined style={{fontSize: '12px'}} /> }
                        style={{
                            padding: '0 4px',
                            marginInlineEnd: '0',
                            backgroundColor: dueDateOptions.color === 'default' ? 'transparent' : 'unset',
                        }}
                        color={dueDateOptions.color}
                        bordered={dueDateOptions.color !== 'default' }
                    >
                        {dueDateOptions.text}
                    </Tag>
                )}
            </div>
        </Card>
    </ConfigProvider>
  )
}

export default ProjectCard