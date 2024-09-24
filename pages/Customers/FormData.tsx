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
import {
  handlePostData,
  handleUpdateData,
} from '../customers/services/customerservice'; // handlePostData'yı servis dosyasından import et
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

  // Regex kuralları
  const nameRegex = /^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?\d{1,3}[- ]?\d{1,4}[- ]?\d{1,3}[- ]?\d{1,9}$/;
  const postalCodeRegex = /^\d{5}$/; // Türkiye için 5 haneli posta kodu
  const addressRegex = /^[a-zA-ZığüşöçİĞÜŞÖÇ0-9\s]+$/; // Adres için
  const decimalRegex = /^\d+(\.\d{1,2})?$/;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form alanları değiştiğinde bu fonksiyonu çağırın
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    onFormChange(updatedData);

    // Regex kontrolleri
    const newErrors: { [key: string]: string } = { ...errors };
    if (value === '') {
      delete newErrors[name];
    } else if (name === 'firstName' && !nameRegex.test(value)) {
      newErrors.firstName = 'Geçersiz ad formatı';
    } else if (name === 'lastName' && !nameRegex.test(value)) {
      newErrors.lastName = 'Geçersiz soyad formatı';
    } else if (name === 'email' && !emailRegex.test(value)) {
      newErrors.email = 'Geçersiz email formatı';
    } else if (name === 'phone' && !phoneRegex.test(value)) {
      newErrors.phone = 'Geçersiz telefon formatı';
    } else if (name === 'postalCode' && !postalCodeRegex.test(value)) {
      newErrors.postalCode = 'Geçersiz posta kodu formatı';
    } else if (name === 'address' && !addressRegex.test(value)) {
      newErrors.address = 'Geçersiz adres formatı';
    } else if (name === 'company' && !nameRegex.test(value)) {
      newErrors.company = 'Geçersiz şirket formatı';
    } else if (name === 'position' && !nameRegex.test(value)) {
      newErrors.position = 'Geçersiz pozisyon formatı';
    } else if (name === 'city' && !nameRegex.test(value)) {
      newErrors.city = 'Geçersiz şehir formatı';
    } else if (name === 'country' && !nameRegex.test(value)) {
      newErrors.country = 'Geçersiz ülke formatı';
    } else if (name === 'debt' && !decimalRegex.test(value)) {
      newErrors.debt = 'Geçersiz borç formatı';
    } else if (name === 'credit' && !decimalRegex.test(value)) {
      newErrors.credit = 'Geçersiz kredi formatı';
    } else if (name === 'balanceDebt' && !decimalRegex.test(value)) {
      newErrors.balanceDebt = 'Geçersiz borç bakiyesi formatı';
    } else if (name === 'balanceCredit' && !decimalRegex.test(value)) {
      newErrors.balanceCredit = 'Geçersiz kredi bakiyesi formatı';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };
  const createEmptyCariRecord = (): CariRecord => ({
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
  });

  const handleClearForm = () => {
    onFormChange(createEmptyCariRecord());
  };

  // Form gönderildiğinde bu fonksiyonu çağırın
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      toast.error('Formda hatalar var. Lütfen düzeltin.');
      return;
    }

    try {
      let result;
      if (mode === 'new') {
        // id'yi formData'dan çıkar
        const { id, ...formDataWithoutId } = formData;
        console.log('Gönderilecek veri:', formDataWithoutId);
        result = await handlePostData(formDataWithoutId);
        console.log('Yeni müşteri başarıyla oluşturuldu:', result);
        toast.success('Yeni müşteri başarıyla oluşturuldu!');
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
          console.log(
            'Sunucu hata detayları:',
            axiosError.response.data.errors
          );
          showErrors(axiosError.response.data.errors);
        } else {
          toast.error(`Bir hata oluştu: ${error.message}`);
        }
      } else {
        toast.error('Beklenmeyen bir hata oluştu, lütfen tekrar deneyin.');
      }
    }
  };

  // init fonksiyonu
  const init = () => {
    // Burada formun başlangıç durumunu ayarlayabilirsiniz
    console.log('Form initialized');
  };

  useEffect(() => {
    init();
  }, []);

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
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.firstName}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.lastName}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.phone}
                </Form.Control.Feedback>
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
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.address}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Posta Kodu</Form.Label>
              <Form.Control
                type='text'
                name='postalCode'
                value={safeFormData.postalCode}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
                isInvalid={!!errors.postalCode}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.postalCode}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.company}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.company}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Pozisyon</Form.Label>
              <Form.Control
                type='text'
                name='position'
                value={safeFormData.position}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
                isInvalid={!!errors.position}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.position}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.country}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.country}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Şehir</Form.Label>
              <Form.Control
                type='text'
                name='city'
                value={safeFormData.city}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.city}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.debt}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.debt}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Kredi</Form.Label>
              <Form.Control
                type='number'
                name='credit'
                value={safeFormData.credit}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
                isInvalid={!!errors.credit}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.credit}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Borç Bakiyesi</Form.Label>
              <Form.Control
                type='number'
                name='balanceDebt'
                value={safeFormData.balanceDebt}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
                isInvalid={!!errors.balanceDebt}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.balanceDebt}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Kredi Bakiyesi</Form.Label>
              <Form.Control
                type='number'
                name='balanceCredit'
                value={safeFormData.balanceCredit}
                onChange={handleInputChange}
                readOnly={mode === 'view'}
                isInvalid={!!errors.balanceCredit}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.balanceCredit}
              </Form.Control.Feedback>
            </Col>
          </Row>
          {mode !== 'view' && (
            <Row className='mb-3'>
              <Col className='d-flex justify-content-between'>
                {mode === 'new' ? (
                  <>
                    <Button variant='secondary' onClick={handleClearForm}>
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
