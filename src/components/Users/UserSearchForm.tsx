import React from 'react'
import { Formik, Form, Field } from 'formik'
import { FilterType } from '../../redux/usersReducer'

const usersSearchValidate = (values: any) => {
	const errors = {}
	return errors
}

type PropsType = {
	onFilterChange: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChange }) => {
	const submit = (
		values: FilterType,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		onFilterChange(values)
		setSubmitting(false)
	}

	return (
		<>
			<Formik initialValues={{ term: '' }} validate={usersSearchValidate} onSubmit={submit}>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='term' placeholder='Search user' />
						<button type='submit' disabled={isSubmitting}>
							Search
						</button>
					</Form>
				)}
			</Formik>
		</>
	)
})
