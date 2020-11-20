import React, {FC, useEffect, useState} from 'react';
import axios from 'axios';

const App: FC = () => {
    const [title, setTitle] = useState('');
    const postData = {
        title: 'my title',
        body: 'hello man'
    };
    useEffect(() => {
        axios.post('https://jsonplaceholder.typicode.com/posts', postData)
            .then(response => {
                setTitle(response.data.title);
            });
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const uploadedFile = files[0];
            const formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios.post('https://jsonplaceholder.typicode.com/posts',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(response=>{
                console.log(response);
            })
        }
    };
    return (
        <div className="App">
            <header className="App-header">
                <input type="file" name="myFile" onChange={handleFileChange}/>
            </header>
        </div>
    );
};

export default App;
