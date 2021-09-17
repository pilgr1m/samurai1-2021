import React from 'react'
import { Formik, Form, Field } from 'formik'
import { FilterType } from '../../redux/usersReducer'

const usersSearchValidate = (values: any) => {
	const errors = {}
	return errors
}

type FormType = {
	term: string
	friend: 'true' | 'false' | 'null'
}

type PropsType = {
	onFilterChange: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChange }) => {
	const submit = (
		values: FormType,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
		}
		console.log('values: ', values)
		console.log('filter: ', filter)

		onFilterChange(filter)
		setSubmitting(false)
	}

	return (
		<>
			<Formik
				initialValues={{ term: '', friend: 'null' }}
				validate={usersSearchValidate}
				onSubmit={submit}>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='term' placeholder='Search user' />
						<Field name='friend' as='select' placeholder="Select user's type">
							<option value='null'>All</option>
							<option value='true'>Only followed</option>
							<option value='false'>Only unfollowed</option>
						</Field>
						<button type='submit' disabled={isSubmitting}>
							Search
						</button>
					</Form>
				)}
			</Formik>
		</>
	)
})
