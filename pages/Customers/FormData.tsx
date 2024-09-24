import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
  FaBuilding,
  FaCity,
  FaFlag,
  FaClipboard,
  FaMoneyBillAlt,
} from 'react-icons/fa';
import CariRecord from '../models/CariRecordModel'; // CariRecord modelini import edin
import { handlePostData, handleUpdateData } from '../customers/services/customerservice'; // handlePostData'yı servis dosyasından import et
import { showErrors } from '../errors/utility'; // Eğer customerservice.js içinde tuttuysanız
import { toast } from 'react-toastify';


interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  formData: CariRecord; // CariRecord tipini kullanın
  mode: 'new' | 'edit' | 'view';
  onFormChange: (updatedData: CariRecord) => void;
  onFormSubmit: () => Promise<void>;
}

const ModalForm: React.FC<ModalFormProps> = ({
  show,
  handleClose,
  formData,
  mode,
  onFormChange,
  onFormSubmit,
}) => {
  // formData'nın undefined olma ihtimaline karşı varsayılan değerler atayalım
  const safeFormData: CariRecord = formData || {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    company: '',
    position: '',
    country: '',
    city: '',
    notes: '',
    debt: 0,
    credit: 0,
    balanceDebt: 0,
    balanceCredit: 0,
    // CariRecord'da bulunan diğer alanları da ekleyin
  };
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // Formun geçerli olup olmadığını kontrol ediyoruz

  // Form alanları değiştiğinde bu fonksiyonu çağırın
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    onFormChange(updatedData);
  };

  const resetForm = () => {
    const emptyFormData: CariRecord = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      company: '',
      position: '',
      country: '',
      city: '',
      notes: '',
      debt: 0,
      credit: 0,
      balanceDebt: 0,
      balanceCredit: 0,
    };
    onFormChange(emptyFormData);
  };

  // Form gönderildiğinde bu fonksiyonu çağırın
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isFormValid = true; // TODO: İleride gerçek form doğrulaması eklenecek

    if (isFormValid) {
      try {
        let result;
        if (mode === 'new') {
          // id'yi formData'dan çıkar
          const { id, ...formDataWithoutId } = formData;
          console.log('Gönderilecek veri:', formDataWithoutId);
          result = await handlePostData(formDataWithoutId);
          console.log('Yeni müşteri başarıyla oluşturuldu:', result);
          toast.success('Yeni müşteri başarıyla oluşturuldu!');
          resetForm(); // Yeni kayıt oluşturulduktan sonra formu sıfırla
        } else if (mode === 'edit') {
          result = await handleUpdateData(String(safeFormData.id), formData);
          console.log('Müşteri başarıyla güncellendi:', result);
          toast.success('Müşteri başarıyla güncellendi!');
        }
        onFormSubmit(); // await kaldırıldı
        handleClose();
      } catch (error) {
        console.error('Bir hata oluştu:', error);
        if (error instanceof Error) {
          const axiosError = error as any;
          if (axiosError.response?.data?.errors) {
            console.log('Sunucu hata detayları:', axiosError.response.data.errors);
            showErrors(axiosError.response.data.errors);
          } else {
            toast.error(`Bir hata oluştu: ${error.message}`);
          }
        } else {
          toast.error('Beklenmeyen bir hata oluştu, lütfen tekrar deneyin.');
        }
      }
    } else {
      console.log('Form geçersiz. Lütfen gerekli alanları doldurun.');
      toast.error('Form geçersiz. Lütfen gerekli alanları doldurun.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'view' ? 'Kullanıcı Bilgileri' : 'Kullanıcı Formu'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Label>Ad</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type='text'
                  name='firstName'
                  value={safeFormData.firstName}
                  onChange={handleInputChange}
                  readOnly={mode === 'view'}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Label>Soyad</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type='text'
                  name='lastName'
                  value={safeFormData.lastName}
                  onChange={handleInputChange}
                  readOnly={mode === 'view'}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type='email'
                  name='email'
                  value={safeFormData.email}
                  onChange={handleInputChange}
                  readOnly={mode === 'view'}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Label>Telefon</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaPhone />
                </InputGroup.Text>
                <Form.Control
                  type='tel'
                  name='phone'
                  value={safeFormData.phone}
                  onChange={handleInputChange}
                  readOnly={mode === 'view'}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Label>Adres</Form.Label>
              <Form.Control
                type='text'
                name='address'
                value={safeFormData.address}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Posta Kodu</Form.Label>
              <Form.Control
                type='text'
                name='postalCode'
                value={safeFormData.postalCode}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Label>Şirket</Form.Label>
              <Form.Control
                type='text'
                name='company'
                value={safeFormData.company}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Pozisyon</Form.Label>
              <Form.Control
                type='text'
                name='position'
                value={safeFormData.position}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Label>Ülke</Form.Label>
              <Form.Control
                type='text'
                name='country'
                value={safeFormData.country}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Şehir</Form.Label>
              <Form.Control
                type='text'
                name='city'
                value={safeFormData.city}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <Form.Label>Notlar</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='notes'
                value={safeFormData.notes}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={3}>
              <Form.Label>Borç</Form.Label>
              <Form.Control
                type='number'
                name='debt'
                value={safeFormData.debt}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Kredi</Form.Label>
              <Form.Control
                type='number'
                name='credit'
                value={safeFormData.credit}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Borç Bakiyesi</Form.Label>
              <Form.Control
                type='number'
                name='balanceDebt'
                value={safeFormData.balanceDebt}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Kredi Bakiyesi</Form.Label>
              <Form.Control
                type='number'
                name='balanceCredit'
                value={safeFormData.balanceCredit}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
              />
            </Col>
          </Row>
          {mode !== 'view' && (
            <Row className='mb-3'>
              <Col className='d-flex justify-content-between'>
                {mode === 'new' ? (
                  <>
                    <Button
                      variant='secondary'
                      onClick={resetForm}
                    >
                      Temizle
                    </Button>
                    <Button type='submit'>Kaydet</Button>
                  </>
                ) : (
                  <Button type='submit'>Güncelle</Button>
                )}
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
