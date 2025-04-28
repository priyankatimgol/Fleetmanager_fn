import { Autocomplete, Box, Checkbox, Divider, FormControl, FormControlLabel, Grid, Select, TextField, Tooltip, Typography } from '@mui/material'
import '../styles.css'
import { MdOutlineAddCircle, MdDelete } from 'react-icons/md'
import { useEffect, useMemo, useState } from 'react'
import { IconButtons } from 'pages/common-components/Button'
import { FormTextField, MySelectAutoComplete } from 'pages/common-components/FormComponents'
// import { MySelectAutoComplete } from 'pages/common-components/AutoSearchSelect'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const blockInvalidChar = (e) => {
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
};

const handleInputChange = (event) => {
  const value = event.target.value;
  const regex = /^\d*\.?\d{0,1}$/;
  if (!regex.test(value)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
};

const whyAnalysisParam = {
  fkTypeId: null,
  hrs: '',
  ai: '',
  why1: '',
  why2: '',
  why3: '',
  why4: '',
  why5: '',
  why6: '',
  whyDrop1: null,
  whyDrop2: null,
  whyDrop3: null,
  whyDrop4: null,
  whyDrop5: null,
  whyDrop6: null,
  isApproval: false
}

const errorStyle = {
  '& .MuiFormHelperText-root': {
    paddingLeft: '7px',
    fontWeight: 500,
    fontSize: '10px'
  }
}

export const BreakDownInputs = ({setIsDisabled, isDisabled, arrayHelpers, formik, addButton, index, typeDropdown, remainingHrs }) => {
  const state = useSelector((state) => state)
  console.log("state",state?.whyAnalysis)
  const editWhysDropdown = state?.whyAnalysis?.editWhysDropdown;
  const whyReasonsDrop1 = [{id : null, name : "Select..."},...state?.whyAnalysis?.whyReasonsDropdown?.Why1];
  const whyReasonsDrop2 = [{id : null, name : "Select..."},...state?.whyAnalysis?.whyReasonsDropdown?.Why2];
  const whyReasonsDrop3 = [{id : null, name : "Select..."},...state?.whyAnalysis?.whyReasonsDropdown?.Why3];
  const whyReasonsDrop4 = [{id : null, name : "Select..."},...state?.whyAnalysis?.whyReasonsDropdown?.Why4];
  const whyReasonsDrop5 = [{id : null, name : "Select..."},...state?.whyAnalysis?.whyReasonsDropdown?.Why5];
  const whyReasonsDrop6 = [{id : null, name : "Select..."},...state?.whyAnalysis?.whyReasonsDropdown?.Why6];

  const [type, setType] = useState(null);
  const [why1, setWhy1] = useState(false)
  const [why2, setWhy2] = useState(false)
  const [why3, setWhy3] = useState(false)
  const [why4, setWhy4] = useState(false)
  const [why5, setWhy5] = useState(false)
  const [why6, setWhy6] = useState(false)
  const [isApproval, setIsApproval] = useState(false)

  const [approvedRole, setApprovadRole]= useState(null)

  let userMenuList = state?.menu?.userMenuList || [];
  const logbookMenu = userMenuList?.find((d)=>d.title === 'Log Book')
  const synergyMenu = logbookMenu?.children?.find((d)=>d.title === 'Synergy Report')

  const data =state?.menu?.userOriginalMenuList?.data;

  useEffect(()=>{
    if(data && synergyMenu) {
      const approvedMenu = data.find((d)=>d?.menuName === synergyMenu?.title)
      setApprovadRole(approvedMenu?.roleName)
    }
  },[data, synergyMenu, setApprovadRole])

  useEffect(() => {
    const typeObj = formik.values.whyAnalysisDetailList[index].fkTypeId;
    if (typeObj !== "") {
      setType(typeObj);
    }
    remainingHrs(formik.values.whyAnalysisDetailList)
  }, [formik.values.whyAnalysisDetailList])
  useEffect(() => {
    const arr = formik.values.whyAnalysisDetailList;
    if(arr?.every((v => v?.isApproval == true))){
      setIsDisabled(true)
      
    }else{
      setIsDisabled(false)

    }
    
  }, [formik.values.whyAnalysisDetailList])

  return (
    <Box sx={{ mb: (index + 1) === formik.values.whyAnalysisDetailList ? 0 : 1.5 }}>
      <Grid container spacing={2}>
        <Grid item md={3.3}>
          <Typography variant="body2" className="bold-600">
            <span>Type</span>
            <span className='color-red'>*</span>
            {
              addButton && type !== null && (
                <IconButtons
                  size='small'
                  onClick={() => arrayHelpers.insert(formik.values.whyAnalysisDetailList.length + 1, whyAnalysisParam)}
                  icon={<MdOutlineAddCircle color='#019e89' />}
                />
              )
            }
            {
              formik.values.whyAnalysisDetailList.length > 1 && (
                <IconButtons
                  size='small'
                  onClick={() => arrayHelpers.remove(index)}
                  icon={<MdDelete color='#e72e3d' />}
                />
              )
            }
            {type !== null && (approvedRole === "Admin" || approvedRole === "Synergy Admin") &&
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    name={`whyAnalysisDetailList.${index}.isApproval`}
                    checked={formik.values.whyAnalysisDetailList[index]?.isApproval}
                    onChange={(e) => {
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.isApproval`, e.target.checked);
                    }}
                  />
                }
                label="Approved"
              />
            }

          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            className="default-textbox"
          >
            <Autocomplete
              disableClearable
              autoFocus
              id="combo-box-demo"
              options={editWhysDropdown || []}
              getOptionLabel={(option) => option.name}
              value={formik.values.whyAnalysisDetailList[index]?.fkTypeId}
              size='small'
              onChange={(e, value) => {
                setType(value);
                formik.setFieldValue(`whyAnalysisDetailList.${index}.fkTypeId`, value)
              }}
              className='fontSize-13'
              ListboxProps={{ style: { maxHeight: 150 } }}
              renderInput={(params) => (
                <TextField autoFocus {...params}
                  sx={{ fontSize: '13px' }}
                  error={
                    Object.keys(formik.errors).length > 0 && formik.errors?.whyAnalysisDetailList[index]?.fkTypeId
                  }
                />
              )}
            />
          </FormControl>
        </Grid>

        {
          type !== null && (
            <>
              <Grid item md={1.7} style={{ marginTop: "18px" }}>
                <FormTextField
                  autoFocus
                  name={`whyAnalysisDetailList.${index}.ai`}
                  toplabel="Description"
                  value={formik.values.whyAnalysisDetailList[index]?.ai}
                  id='ai'
                  onChange={formik.handleChange}
                  size='small'
                  className='fontSize-13 errorStyle'
                />
              </Grid>
              <Grid item md={1} style={{ marginTop: "18px" }}>
                <FormTextField
                  name={`whyAnalysisDetailList.${index}.hrs`}
                  toplabel="Hrs"
                  id='hrs'
                  value={formik.values.whyAnalysisDetailList[index]?.hrs}
                  inputProps={{
                    type: "number",
                    inputMode: "numeric",
                    pattern: '[0-9]*',
                    min: 0,
                    maxLength: 4
                  }}
                  size='small'
                  onChange={formik.handleChange}
                  onKeyPress={(e) => {
                    handleInputChange(e);
                  }}
                  onKeyDown={(e) => {
                    blockInvalidChar(e);
                    if (
                      e.target.selectionStart === 0 &&
                      e.code === "Space"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className='fontSize-13 errorStyle'
                />
              </Grid>
              <Grid item md={3} style={{ marginTop: "18px" }}>
                <MySelectAutoComplete
                  toplabel="Why 1"
                  options={whyReasonsDrop1 ?? []}
                  getOptionLabel={(option) => option?.name}
                  name={`whyAnalysisDetailList.${index}.whyDrop1`}
                  value={formik.values.whyAnalysisDetailList[index]?.whyDrop1}
                  onChange={(e, value) => {
                    if (value?.name === "Others") {
                      setWhy1(true)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop1`, value)
                    } else {
                      setWhy1(false)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop1`, value)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.why1`, "")
                    }
                  }}
                  className='fontSize-13'
                  ListboxProps={{ style: { maxHeight: 150 } }}
                  size='small'
                  renderInput={(params) => <TextField  {...params} />}
                />
                {why1 &&
                  <Box mt={1}>
                    <FormTextField
                      id="remarks1-multiline-flexible"
                      name={`whyAnalysisDetailList.${index}.why1`}
                      multiline
                      size='small'
                      value={formik.values.whyAnalysisDetailList[index]?.why1}
                      rows={2}
                      placeholder='Enter remark here...'
                      onChange={formik.handleChange}
                      className='textAreaStyle errorStyle'
                    />
                  </Box>
                }
              </Grid>
              <Grid item md={3} style={{ marginTop: "18px", position: "relative" }}>
                <MySelectAutoComplete
                  toplabel="Why 2"
                  options={whyReasonsDrop2 ?? []}
                  getOptionLabel={(option) => option?.name}
                  name={`whyAnalysisDetailList.${index}.whyDrop2`}
                  value={formik.values.whyAnalysisDetailList[index]?.whyDrop2}
                  onChange={(e, value) => {
                    if (value?.name === "Others") {
                      setWhy2(true)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop2`, value)
                    } else {
                      setWhy2(false)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop2`, value)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.why2`, "")
                    }
                  }}
                  className='fontSize-13'
                  ListboxProps={{ style: { maxHeight: 150 } }}
                  size='small'
                  renderInput={(params) => <TextField  {...params} />}
                />
                {why2 &&
                  <Box mt={1}>
                    <FormTextField
                      id="remarks1-multiline-flexible"
                      name={`whyAnalysisDetailList.${index}.why2`}
                      multiline
                      size='small'
                      value={formik.values.whyAnalysisDetailList[index]?.why2}
                      rows={2}
                      placeholder='Enter remark here...'
                      onChange={formik.handleChange}
                      className='textAreaStyle'
                    />
                  </Box>
                }
              </Grid>
              <Grid item md={3}>
                <MySelectAutoComplete
                  toplabel="Why 3"
                  options={whyReasonsDrop3 ?? []}
                  getOptionLabel={(option) => option?.name}
                  name={`whyAnalysisDetailList.${index}.whyDrop3`}
                  value={formik.values.whyAnalysisDetailList[index]?.whyDrop3}
                  onChange={(e, value) => {
                    if (value?.name === "Others") {
                      setWhy3(true)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop3`, value)
                    } else {
                      setWhy3(false)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop3`, value)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.why3`, "")
                    }
                  }}
                  className='fontSize-13'
                  ListboxProps={{ style: { maxHeight: 150 } }}
                  size='small'
                  renderInput={(params) => <TextField  {...params} />}
                />
                {why3 &&
                  <Box mt={1}>
                    <FormTextField
                      id="remarks1-multiline-flexible"
                      name={`whyAnalysisDetailList.${index}.why3`}
                      multiline
                      size='small'
                      value={formik.values.whyAnalysisDetailList[index]?.why3}
                      rows={2}
                      placeholder='Enter remark here...'
                      onChange={formik.handleChange}
                      className='textAreaStyle'
                    />
                  </Box>
                }
              </Grid>

              <Grid item md={3}>
                <MySelectAutoComplete
                  toplabel="Why 4"
                  options={whyReasonsDrop4 ?? []}
                  getOptionLabel={(option) => option?.name}
                  name={`whyAnalysisDetailList.${index}.whyDrop4`}
                  value={formik.values.whyAnalysisDetailList[index]?.whyDrop4}
                  onChange={(e, value) => {
                    if (value?.name === "Others") {
                      setWhy4(true)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop4`, value)
                    } else {
                      setWhy4(false)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop4`, value)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.why4`, "")
                    }
                  }}
                  className='fontSize-13'
                  ListboxProps={{ style: { maxHeight: 150 } }}
                  size='small'
                  renderInput={(params) => <TextField  {...params} />}
                />
                {why4 &&
                  <Box mt={1}>
                    <FormTextField
                      id="remarks1-multiline-flexible"
                      name={`whyAnalysisDetailList.${index}.why4`}
                      multiline
                      size='small'
                      value={formik.values.whyAnalysisDetailList[index]?.why4}
                      rows={2}
                      placeholder='Enter remark here...'
                      onChange={formik.handleChange}
                      className='textAreaStyle'
                    />
                  </Box>
                }
              </Grid>
              <Grid item md={3}>
                <MySelectAutoComplete
                  toplabel="Why 5"
                  options={whyReasonsDrop5 ?? []}
                  getOptionLabel={(option) => option?.name}
                  name={`whyAnalysisDetailList.${index}.whyDrop5`}
                  value={formik.values.whyAnalysisDetailList[index]?.whyDrop5}
                  onChange={(e, value) => {
                    if (value?.name === "Others") {
                      setWhy5(true)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop5`, value)
                    } else {
                      setWhy5(false)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop5`, value)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.why5`, "")
                    }
                  }}
                  className='fontSize-13'
                  ListboxProps={{ style: { maxHeight: 150 } }}
                  size='small'
                  renderInput={(params) => <TextField  {...params} />}
                />
                {why5 &&
                  <Box mt={1}>
                    <FormTextField
                      id="remarks1-multiline-flexible"
                      name={`whyAnalysisDetailList.${index}.why5`}
                      multiline
                      size='small'
                      value={formik.values.whyAnalysisDetailList[index]?.why5}
                      rows={2}
                      placeholder='Enter remark here...'
                      onChange={formik.handleChange}
                      className='textAreaStyle'
                    />
                  </Box>
                }
              </Grid>
              <Grid item md={3}>
                <MySelectAutoComplete
                  toplabel="Why 6"
                  options={whyReasonsDrop6 ?? []}
                  getOptionLabel={(option) => option?.name}
                  name={`whyAnalysisDetailList.${index}.whyDrop6`}
                  value={formik.values.whyAnalysisDetailList[index]?.whyDrop6}
                  onChange={(e, value) => {
                    if (value?.name === "Others") {
                      setWhy6(true)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop6`, value)
                    } else {
                      setWhy6(false)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.whyDrop6`, value)
                      formik.setFieldValue(`whyAnalysisDetailList.${index}.why6`, "")
                    }
                  }}
                  className='fontSize-13'
                  ListboxProps={{ style: { maxHeight: 150 } }}
                  size='small'
                  renderInput={(params) => <TextField  {...params} />}
                />
                {why6 &&
                  <Box mt={1}>
                    <FormTextField
                      id="remarks1-multiline-flexible"
                      name={`whyAnalysisDetailList.${index}.why6`}
                      multiline
                      size='small'
                      value={formik.values.whyAnalysisDetailList[index]?.why6}
                      rows={2}
                      placeholder='Enter remark here...'
                      onChange={formik.handleChange}
                      className='textAreaStyle'
                    />
                  </Box>
                }
              </Grid>
              <Divider sx={{ mt: 2, borderWidth: '1px', width: '99%', ml: '8px' }} />
            </>
          )
        }
      </Grid>
    </Box>
  )
}
