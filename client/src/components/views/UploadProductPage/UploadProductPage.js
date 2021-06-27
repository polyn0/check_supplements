import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon, Descriptions } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';
function UploadProductPage(props) {

    const { Title } = Typography;
    const { TextArea } = Input;
    const Continents = [ // 영양성분 facts
        { key: 1, value: "비타민 D" },
        { key: 2, value: "루테인" },
        { key: 3, value: "오메가3" },
        { key: 4, value: "멀티비타민" },
        { key: 5, value: "유산균" },
    ]
    
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1) //key number 1- initial state

    const[Images, setImages] = useState([]) //이미지를 한번에 back-end로 보내줌

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value )
    }
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value )
    }
    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value )
    }
    const onContinentSelectChange = (event) => {
        setContinentValue(event.currentTarget.value )
    }

    const updateImages = (newImages) => {
        
        // console.log(newImages) //확인용
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        //http request 전에 먼저 예외처리
        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }


        const variables = { // 서버에 보낼 것들
            writer: props.user.userData._id, // Redux에서 가져올거야 UploadProductPage의 parent component
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue
        }
        
        //http post request: (경로에다, 이걸) post할거임
        Axios.post('/api/product/uploadProduct', variables)
            .then(response=>{
                if(response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level = {2}> Upload Supplements Product</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages}></FileUpload>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br />
                <br />
                <label>영양성분</label>
                <br />
                <select onChange={onContinentSelectChange}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}                   
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
        

    )
}

export default UploadProductPage

