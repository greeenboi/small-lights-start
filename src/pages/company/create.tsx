import React from 'react'
import { CompanyListPage } from './list'
import { Form, Input, Modal, Select } from 'antd'
import { useModalForm, useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { UsersSelectQuery } from '@/graphql/types'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import SelectOptionWithAvatar from '@/components/skeleton/select-option-with-avatar'

export const Create = () => {

    const go = useGo();

    const goToListPage = () => {
        go({
            to:{ resource:'companies', action:'list' },
            options:{ keepQuery:true },
            type:'replace'
        })
    }
  
    const { formProps, modalProps } = useModalForm({
        action: 'create',
        defaultVisible: true,
        resource: 'companies',
        redirect:false,
        mutationMode:'pessimistic',
        onMutationSuccess: goToListPage,
        meta:{
            gqlMutation: CREATE_COMPANY_MUTATION,
        }
    })

    const { selectProps, queryResult } = useSelect<
        GetFieldsFromList<UsersSelectQuery>
        >({
        resource: "users",
        meta: {
        gqlQuery: USERS_SELECT_QUERY,
        },
        optionLabel: "name",
    });
  
    return (
    <CompanyListPage>
        <Modal
            {...modalProps}
            mask={true}
            onCancel={goToListPage}
            title="Create Company"
            width={512}
        >
            <Form {...formProps} layout='vertical'>
                <Form.Item
                    label="Company Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input a name!' }]}
                >
                    <Input placeholder='Please enter a company name'/>
                </Form.Item>
                <Form.Item
                    label="Sales owner"
                    name="salesOwnerId"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Please sales owner user"
                        {...selectProps}
                        options={
                        queryResult.data?.data?.map((user) => ({
                            value: user.id,
                            label: (
                            <SelectOptionWithAvatar
                                name={user.name}
                                avatarUrl={user.avatarUrl ?? undefined}
                            />
                            ),
                        })) ?? []
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
    </CompanyListPage>
  )
}

