import React , {useState} from 'react'

const ApiCall = () => {

    const [dataApi,setDataApi]=useState([])
 
    const getData = async () => {

      let config = {
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      }
      try {
        let response = await fetch('https://hyena-amazing-gibbon.ngrok-free.app/api/scm/reports?pageNumber=1&pageSize=1000',config)

      console.log('response',response)
      } catch (error) {
        console.log('error',error)
      }
      
    }
    getData()
  return {dataApi}
}

export default ApiCall
