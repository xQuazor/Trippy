import styles from './checkin.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { colorgreen, colorred, colorblue, colorwhite500 } from '../variables'
import Image from 'next/image'
import { useDisclosure } from '@chakra-ui/hooks'
import typography from '../../scss/typography.module.scss'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function Checkin({
    isSelecting,
    handleIsSelecting,
    handleSubmitMarker,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedName, setSelectedName] = useState('')
    const [imageObject, setImageObject] = useState(null)
    const handleFileChange = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (file.size / 1024 / 1024 > 5) {
            alert('File size must be less than 5MB')
            return
        }
        setSelectedFile(file)
        if (file) {
            setImageObject(URL.createObjectURL(file))
        }
        // Additional validation logic
    }
    const handleNameChange = (event) => {
        event.preventDefault()
        setSelectedName(event.target.value)
    }
    const sendFile = (event) => {
        event.preventDefault()
        const name = document.getElementById('point_name')
        const text = name.innerText
        console.log(text)
        setSelectedName(text)
        if (!selectedName) {
            alert('Your picture needs name!')
            return
        } else if (!selectedFile) {
            alert('I think you forgot to attach a picture...')
            return
        }
        handleSubmitMarker(selectedName, selectedFile)
        handleIsSelecting(false)
        setSelectedFile(null)
        setSelectedName(null)
        setImageObject(null)
        onClose()
    }
    return (
        <div className={styles.container}>
            {isSelecting ? (
                <>
                    <button
                        className={styles.container__button}
                        onClick={() => handleIsSelecting(false)}
                    >
                        <CloseIcon htmlColor={colorred} sx={{ fontSize: 32 }} />
                    </button>
                    <button
                        className={styles.container__button}
                        onClick={() => {
                            onOpen()
                        }}
                    >
                        <CheckIcon
                            htmlColor={colorgreen}
                            sx={{ fontSize: 32 }}
                        />
                    </button>
                </>
            ) : (
                <button
                    className={styles.container__button}
                    onClick={() => handleIsSelecting(true)}
                >
                    <LocationOnIcon
                        htmlColor={colorblue}
                        sx={{ fontSize: 28 }}
                    />
                </button>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Point</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form className={styles.container__details}>
                            <div>
                                <label className={typography.paragraph}>
                                    Name
                                </label>
                                <Input
                                    placeholder="Point Name"
                                    id="point_name"
                                    errorBorderColor="crimson"
                                    type="text"
                                    minLength={2}
                                    maxLength={64}
                                    className={typography.paragraph}
                                    value={selectedName}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className={styles.upload__photo}>
                                <label className={typography.paragraph}>
                                    Upload Photo
                                </label>
                                <label
                                    htmlFor="photo_upload"
                                    className={styles.custom__input}
                                >
                                    <p
                                        style={
                                            selectedName
                                                ? {}
                                                : { color: '#D6D6D6' }
                                        }
                                        className={typography.paragraph}
                                    >
                                        Browse Files (Max Size 5MB)
                                    </p>
                                    <FileUploadOutlinedIcon
                                        htmlColor={colorwhite500}
                                        sx={{ fontSize: 20 }}
                                    />
                                </label>
                                <Input
                                    placeholder="Point Name"
                                    type="file"
                                    id="photo_upload"
                                    accept="image/png, image/jpeg, image/jpg"
                                    errorBorderColor="crimson"
                                    onChange={handleFileChange}
                                    className={styles.inputfile}
                                />
                                <div
                                    className={
                                        styles.container__uploaded__photo
                                    }
                                >
                                    {imageObject ? (
                                        <Image
                                            src={imageObject}
                                            alt={'uploaded photo'}
                                            fill={true}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className={typography.paragraph}
                            colorScheme="green"
                            onClick={sendFile}
                            mr={3}
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            className={typography.paragraph}
                            onClick={onClose}
                            variant="red"
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
