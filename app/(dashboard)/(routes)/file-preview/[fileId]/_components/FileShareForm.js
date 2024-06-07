import { Copy } from 'lucide-react';
import React, { useState } from 'react';
import GlobalApi from './../../../../../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import Toast from '../../../../../_components/Toast';
import  CryptoJS  from 'crypto-js';

function FileShareForm({ file, onPasswordSave }) {
    const [isPasswordEnable, setIsEnablePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [toast, setToast] = useState();
    const { user } = useUser();

    const encryptFile = (fileContent) => {
        try {
            const key = '6Ab82lbEeCWwtxWsfJWqKQU2onvhU1LPhYMqpHYZS69fnHSZwf76C37CmBYWSaA9gIdzhQeOG9iZbGPDxpjY6YoiGzn517liV7OPT7BFSEpmRIF4ZpZzLtkCLcQkm8IJ';
    
            // Encrypt the file content using AES encryption
            const encrypted = CryptoJS.AES.encrypt(fileContent, key).toString();
    
            console.log('Encrypted File:', encrypted); // Log encrypted file content for verification
            return encrypted;
        } catch (error) {
            console.error('Encryption Error:', error); // Log any encryption errors
            return null; // Return null or handle the error appropriately
        }
    };

    const sendEmail = () => {
        setToast({
            status: 'sending...',
            msg: 'Sending Email!'
        });

        const encryptedContent = encryptFile(file.fileContent);  // Assuming file.fileContent contains the file data
        const data = {
            emailToSend: email,
            userName: user?.fullName,
            fileName: file.fileName,
            fileSize: file.fileSize,
            fileType: file.fileType,
            shortUrl: file?.shortUrl,
            encryptedContent: encryptedContent  // Add encrypted content to data
        };

        GlobalApi.SendEmail(data).then(resp => {
            console.log(resp);
            setToast({
                status: 'success',
                msg: 'Email Sent Successfully!'
            });
        });
    };

    const onCopyClick = () => {
        navigator.clipboard.writeText(file.shortUrl);
        setToast({
            status: 'Copied',
            msg: 'Url Copied!'
        });
    };

    return file && (
        <div className='flex flex-col gap-2'>
            <div>
                <label className='text-[14px] text-gray-500'>Short Url</label>
                <div className='flex gap-5 p-2 border rounded-md justify-between'>
                    <input type="text" value={file.shortUrl} disabled
                        className='disabled:text-gray-500 bg-transparent
                        outline-none w-full' />
                    <Copy className='text-gray-400 hover:text-gray-600 
                    cursor-pointer' onClick={() => onCopyClick()} />
                </div>
            </div>
            <div className='gap-3 flex mt-5'>
                <input type='checkbox'
                    defaultChecked={file.password !== ''}
                    onChange={(e) => setIsEnablePassword(e.target.checked)} />
                <label>Enable Password?</label>
            </div>

            {isPasswordEnable ?
                <div className='flex gap-3 items-center'>
                    <div className='border rounded-md w-full p-2'>
                        <input type="password"
                            defaultValue={file.password}
                            className='disabled:text-gray-500 bg-transparent
                            outline-none' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='p-2 bg-primary text-white
                        rounded-md disabled:bg-gray-300 hover:bg-blue-600'
                        disabled={password?.length < 3}
                        onClick={() => onPasswordSave(password)}
                    >Save</button>
                </div> : null}

            <div className='border rounded-md p-3 mt-5'>
                <label className='text-[14px] text-gray-500'>Send File to Email</label>
                <div className='border rounded-md p-2'>
                    <input type="email"
                        placeholder='example@gmail.com'
                        className=' bg-transparent
                        outline-none w-full'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className='p-2 disabled:bg-gray-300
                    bg-primary text-white hover:bg-blue-600
                    w-full mt-2 rounded-md'
                    disabled={email?.length < 3}
                    onClick={() => sendEmail()}
                >Send Email</button>
            </div>

            {toast?.status ? <Toast
                toast={toast}
                closeToast={() => setToast(null)}
            /> : null}
        </div>
    );
}

export default FileShareForm;
