import React, { useEffect, useState } from 'react'
import set from "lodash/fp/set";
import { Field } from "redux-form";
import * as BS from "react-bootstrap";
import initialData from "../dataFactory";
import FormProvider from "../FormProvider";
import ActionsCell from "../ActionsCell";
import HighlightCell from "../HighlightCell";
import GridFilters from "../GridFilters";


import styled from 'styled-components'
import { useTable, usePagination, useFilters, useRowSelect } from 'react-table'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDataPaymentById } from "../store/reducers/payment/paymentAction";
import TableFilter from 'react-table-filter';
import { matchSorter } from "match-sorter";
import Dropdown from "../Dropdown/Dropdown";
import { updatePaymentData } from "../store/reducers/payment/updatePaymentData";
import { GridToolbar } from "@mui/x-data-grid";


// import react-table-filter/lib/styles.css;

const Styles = styled.div`
/* This is required to make the table full-width */
  display: block;
  // max-width: 1100px;
  // width: 1100px;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    table-layout:fixed;
    border-spacing: 0;

    tr {
     th {
      div{
    input {
            border: 1px solid;
            margin: -1px;
    }}}

    select {
        width: 100%;
        }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

   th,
    td {
      margin: 0;
      font-size: 10px;
      padding: 0.2rem;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
        white-space: nowrap;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }
      input {
        font-size: 0.75rem;
        width: 100%;
        border: 0;
      }




      :last-child {
        border-right: 0;
      }

    }
  }

  .pagination {
    padding: 1rem 0;
    text-align: end;

    .pagination_btnBlock{
    margin-bottom: 20px;
    font-size: 0.9em;
    }
    button{
    margin-right: 10px;
    }
  }

`

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// // Set our editable cell renderer as the default Cell renderer
// const defaultColumn = React.useMemo(
//     () => ({
//         // Let's set up our default Filter UI
//         Filter: DefaultColumnFilter,
//         // And also our default editable cell
//         Cell: EditableCell,
//     }),
//     []
// )

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)


// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
            // And also our default editable cell
            Cell: EditableCell,
        }),
        []
    )

    const [selectedRow, setSelectedRow] = useState([]);


    const dispatch = useDispatch();
    const updatePayment = () => {
        const updateData = selectedRow[selectedRow.length - 1];
        const updateId = updateData.id
        // e.preventDefault();
        dispatch(updatePaymentData(updateId, updateData))
        console.log("updatePaymentData:", updateId, updateData);
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        rows,
        selectedFlatRows,
        state: { pageIndex, pageSize, filters, selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            defaultColumn,
            // use the skipPageReset option to disable page resetting temporarily
            autoResetPage: !skipPageReset,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData,

            stateReducer: (newState, action) => {
                if (action.type === "toggleRowSelected") {
                    newState.selectedRowIds = {
                        [action.id]: true
                    }
                }

                return newState;
            },
        },
        useFilters,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => {
                        const rowData = row.values;
                        console.log("row.values", row.values)
                        return (


                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} onClick={() => {
                                    setSelectedRow([...selectedRow, rowData]);
                                }} />
                            </div>
                        )
                    }

                },
                ...columns,
            ])
        }
    )
    console.log("selectedRow", selectedRow)


    // const dispatch = useDispatch();
    // const updatePayment = (id, data) => {
    //     // e.preventDefault();
    //     dispatch(updatePaymentData(id,data))
    //     console.log("updatePaymentData:", id, data);
    // }


    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (

                                <th {...column.getHeaderProps()} >{column.render('Header')}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}
                            // onClick={() => { console.log(' row click ', row)}}
                            >
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button className='btn-mb' onClick={updatePayment}>Update Data</button>
            <div className="pagination">
                <div className='pagination_btnBlock'>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'Previous Page'}
                    </button>
                    {' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'Next Page'}
                    </button>
                    {' '}

                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>

                {' '}

                <span>Show number of rows </span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30].map(pageSize => (

                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>

                    ))}
                </select>
            </div>

            <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    )
}

function TablePaymentsTest({
    // data, setData,
    setIdEdit }) {
    const [data, setData] = React.useState([])
    const { paymentDataList } = useSelector(({ payment }) => payment);

    console.log("paymentDataList!! data", data)
    console.log("paymentDataList!! data2222", paymentDataList)
    // console.log("paymentDataList!! data", data[2].id)
    // const data1 = data[2].id
    // const [paymentId, setPaymentId] = React.useState("")
    // const getIdOnClick = (e) => {
    //     const paymentId = e.target.getAttribute('value');
    //     // setPaymentId(paymentId)
    // }
    // useEffect ((paymentId) => {
    //     dispatch(getDataPaymentById(paymentId));
    // }, [id]);


    // const dispatch = useDispatch();

    const handleEdit = (row) => {
        setIdEdit(row.row.original.id)
        console.log(' row click - onEdit', row.row.original.id)
    }
    // console.log(' idEdit ', idEdit)
    // const updatePayment = (idEdit, data) => {
    //     // e.preventDefault();
    //     dispatch(updatePaymentData(idEdit,data))
    //     console.log("updatePaymentData:", idEdit, data);
    // }

    // const [state, setState] = useState({data: initialData, editing: null});
    // const [editing, setEditing] = useState( null );

    const [data1, setData1] = useState(initialData);

    const [editing, setEditing] = useState(null);


    const editableComponent = ({ input, editing, value, ...rest }) => {
        const Component = editing ? BS.FormControl : BS.FormControl;
        const children =
            (!editing && <HighlightCell value={value} {...rest} />) || undefined;
        return <Component {...input} {...rest} children={children} />;
    };

    const editableColumnProps = {
        ...GridFilters,
        Cell: props => {
            const editing2 = editing === props.original;
            const fieldProps = {
                component: editableComponent,
                editing2,
                props
            };

            return <Field name={props.column.id} {...fieldProps} />;
        }
    };

    const getActionProps = (gridState, rowProps) =>

        (rowProps && {

            mode: editing === rowProps.original ? "edit" : "view",
            actions: {
                onEdit: () => setEditing({ editing: rowProps.original }),
                onCancel: () => setEditing({ editing: null })
            }
        }) ||
        {};

    const columns = React.useMemo(
        () => [
            {
                Header: "",
                maxWidth: 90,
                filterable: false,
                getProps: getActionProps,
                Cell: ActionsCell,
                accessor: "edit"
            },
            // { Header: "Name", accessor: "name", ...this.editableColumnProps },
            {
                Header: 'Payment Date',
                accessor: 'created',
                ...editableColumnProps
            },
            {
                Header: 'Payment Number',
                accessor: 'id',
                // Cell: ({ data }) => (<Link to={{ pathname: `/payments/${data.row.id}` }}>{data.row.id}</Link>)
                Cell: ({ cell: { value }, row: { original } }) => <Link to={{ pathname: `payments/${original.id}` }}
                    value={value} >{value}</Link>
            },
            {
                Header: 'Site',
                accessor: 'site',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            {
                Header: 'P.Price',
                accessor: 'price',
                ...editableColumnProps
            },
            {
                Header: 'P.Service Cost',
                accessor: 'serviceCost',
            },
            {
                Header: 'P.Margin',
                accessor: 'margin',
            },
            {
                Header: 'P.ROI',
                accessor: 'ROI',
            },
            {
                Header: 'Client Name',
                accessor: 'clienName',
                ...editableColumnProps
            },
            {
                Header: 'Client Email',
                accessor: 'clientEmail',
                ...editableColumnProps
            },
            {
                Header: 'Source',
                accessor: 'source',
            },
            {
                Header: 'Payment Type',
                accessor: 'paymentType',
            },
            {
                Header: 'Payment Status',
                accessor: 'status',
                ...editableColumnProps,
                Cell: ({
                    // {cell: {value}, row: {original}}) => {
                    value: initialValue,
                    row: { index },
                    column: { id },
                    updateMyData, }) => {
                    const onItemClick = value => {
                        // initialValue = e.target.value
                        console.log("value111", value)
                        updateMyData(index, id, value)
                    }
                    // const onItemClick = e => (
                    //     value = e.target.value
                    // )
                    console.log("initialValue", initialValue)
                    // updateMyData(index, id, value)

                    return <Dropdown options={[
                        { label: "Not Paid", value: "not paid" },
                        { label: "Paid", value: "paid" },
                        { label: "Refunded", value: "refunded" },
                        { label: "Archived", value: "archived" },
                        { label: "Removed", value: "removed" },
                    ]} onItemClick={onItemClick} selectedValue={initialValue} />;
                }
                // Cell: ({
                //            value: initialValue,
                //            row: { index },
                //            column: { id },
                //            updateMyData,
                //        }) => {
                //     const onItemClick = value => {
                //         console.log("value", value)
                //         updateMyData(index, id, value)
                //     }
                //     return (
                //         <Dropdown
                //             options={[
                //                 { label: "Male", value: "male" },
                //                 { label: "Female", value: "female" },
                //             ]}
                //             title={"Select Gender"}
                //             selectedValue={initialValue}
                //             onItemClick={onItemClick}
                //         />
                //     )
                // },

            },
            // {
            //     Header: '',
            //     accessor: 'edit',
            //     Cell: row => (
            //         <div>
            //             <button onClick={() => handleEdit(row)}>Edit</button>
            //             {/*<button className='btn-mb' onClick={updatePayment}>Update Data</button>*/}
            //         </div>
            //     )
            // }

        ], [data]
    )

    useEffect(() => {
        console.log("componentDidMount");
        const data = paymentDataList.map(item => ({
            created: item.created,
            id: item.id,
            site: item.site,
            price: item.price,
            serviceCost: item.serviceCost,
            margin: item.margin,
            ROI: item.ROI,
            clienName: item.clienName,
            clientEmail: item.clientEmail,
            source: item.source,
            paymentType: item.paymentType,
            status: item.status,
            comments: null
        }));
        setData(data);
    }, []);
    // return data;

    // const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        console.log("11click")
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }




    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])
    //
    // // Let's add a data resetter/randomizer to help
    // // illustrate that flow...
    // const resetData = () => setData(originalData)



    const handleSubmit = values => {
        setEditing(state => {
            const index = editing.indexOf(editing);
            return {
                data: set(`[${index}]`, values, editing)
            };
        });
    };

    return (



        <React.Fragment>
            <h1>react-table inline editing</h1>
            <FormProvider
                form="inline"
                onSubmit={handleSubmit}
                onSubmitSuccess={() => setEditing(null)}
                initialValues={editing}
                enableReinitialize
            >
                {formProps => {
                    return (
                        <form onSubmit={formProps.handleSubmit}>
                            <Styles>
                                <Table
                                    columns={columns}
                                    data={data}
                                    updateMyData={updateMyData}
                                    skipPageReset={skipPageReset}
                                />
                            </Styles>
                        </form>
                    );
                }}
            </FormProvider>
        </React.Fragment>

    )
}
export default TablePaymentsTest;
