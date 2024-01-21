import { UnorderedListOutlined } from '@ant-design/icons'
import { Card, List, Space } from 'antd'
import React from 'react'
import { Text } from '../text'
import LatestActivitiesSkeleton from '../skeleton/latest-activities'
import { useList } from '@refinedev/core'
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '@/graphql/queries'
import Item from 'antd/es/list/Item'
import dayjs from 'dayjs'
import CustomAvatar from '../custom-avatar'

const LatestActivites = () => {
  
  const { data: audits, isLoading: isLoadingAudit, isError, error } = useList({
    resource: 'audits',
    meta:{
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    }
  })

  const dealIds = audits?.data?.map((audit) => audit?.targetId);

  const { data: deals, isLoading: isLoadingDeals } = useList({
    resource: 'deals',
    meta :{
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
    queryOptions: { enabled: !!dealIds?.length },
    pagination:{
      mode:'off'
    },
    filters:[{ field: 'id', operator: 'in', value: dealIds}]
  })
  
  if(isError){
    console.log(error)
    return null
  }

  const isLoading  = isLoadingAudit || isLoadingDeals;

  return (
    <Card
      headStyle={{padding: '16px'}}
      bodyStyle={{padding: '0 rem'}}
      title={(
        <div style={{ display: 'flex', alignItems: 'center', gap:'8px'}}>
          <UnorderedListOutlined/>
          <Text size="sm" style={{ marginLeft: '0.5rem'}}>
            Latest Activities
          </Text>
        </div>
      )}
    >
      {isLoading ? (
        <List
          itemLayout='horizontal'
          dataSource={Array.from({ length: 5 }).map((_, i) => ({
            id: i,
          }))}
          renderItem={(_, index) => (
            <LatestActivitiesSkeleton key={index} />
          )}
        />
      ):(
        <List
          itemLayout='horizontal'
          dataSource={audits?.data}
          renderItem={(Item) => {
            const deal = deals?.data?.find((deal) => deal.id == String(Item.targetId)) || undefined

            return(
              <List.Item>
                <List.Item.Meta 
                  title={dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:mm')}
                  avatar={
                    <CustomAvatar 
                      shape='square'
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                      
                    />
                  }
                  description={
                    <Space size={4} >
                      <Text strong>
                        {Item.user?.name}
                      </Text>
                      <Text>
                        {Item.action === 'CREATE' ? 'created' : 'moved'} 
                      </Text>
                      <Text strong>
                        {deal?.title}
                      </Text>
                      <Text>
                        Deal
                      </Text>
                      <Text>
                        {Item.action === 'CREATE' ? 'in' : 'to'}
                      </Text>
                      <Text strong>
                        {deal?.stage?.title}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )
          }}
        />
      )}
    </Card>
  )
}

export default LatestActivites