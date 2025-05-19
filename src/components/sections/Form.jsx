// react
import { useState, useEffect, useContext } from "react"

// Components
import Subtitle from "../ui/form/Subtitle"
import TransportTypes from "../ui/form/TransportTypes"
import Input from "../ui/form/Input"
import Select from "../ui/form/Select"
import Fieldset from "../ui/form/Fieldset"
import FormText from "../ui/form/FormText"

// Api
import { getHotels } from "../api/hotels"
import { submitStripe } from "../api/stripe"
import { getTransports } from "../api/transports"
import { getAirbnbMunicipalities } from "../api/airbnb-municipality"

// Context
import LoadContext from '../context/load'
import { useTranslations } from '../../i18n/utils'

export default function Form({ lang }) {
  const t = useTranslations(lang)
  const { loading, setLoading } = useContext(LoadContext)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    passengers: '1',
    hotel: 'Airbnb',
    airbnbAddress: '',
    airbnbMunicipality: '',
    arrivingDate: '',
    arrivingTime: '',
    arrivingAirline: '',
    arrivingFlight: '',
    departingDate: '',
    departingTime: '',
    departingAirline: '',
    departingFlight: ''
  })

  // Form errors
  const [errors, setErrors] = useState({})

  // Other state
  const [transports, setTransports] = useState([])
  const [activeTransportType, setActiveTransportType] = useState('Arriving')
  const [activeTransportPrice, setActiveTransportPrice] = useState(0)
  const [mediaQuery, setMediaQuery] = useState(false)
  const [hotels, setHotels] = useState([])
  const [airbnbMunicipalities, setAirbnbMunicipalities] = useState([])
  const [total, setTotal] = useState(0)

  // Validation function
  const validateForm = () => {
    const newErrors = {}
    
    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    
    // Date and time validation
    if (activeTransportType.includes('Arriving')) {
      if (!formData.arrivingDate) newErrors.arrivingDate = 'Arriving date is required'
      if (!formData.arrivingTime) newErrors.arrivingTime = 'Arriving time is required'
      if (!formData.arrivingAirline.trim()) newErrors.arrivingAirline = 'Airline is required'
      if (!formData.arrivingFlight.trim()) newErrors.arrivingFlight = 'Flight number is required'
    }
    
    if (activeTransportType.includes('Departing')) {
      if (!formData.departingDate) newErrors.departingDate = 'Departing date is required'
      if (!formData.departingTime) newErrors.departingTime = 'Departing time is required'
      if (!formData.departingAirline.trim()) newErrors.departingAirline = 'Airline is required'
      if (!formData.departingFlight.trim()) newErrors.departingFlight = 'Flight number is required'
    }
    
    // Airbnb validation
    if (formData.hotel === 'Airbnb') {
      if (!formData.airbnbMunicipality) newErrors.airbnbMunicipality = 'Municipality is required'
      if (!formData.airbnbAddress.trim()) newErrors.airbnbAddress = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleUpdateType(id) {
    setActiveTransportType(id)
    const price = transports.find(transport => transport.id === id).price
    setActiveTransportPrice(price)
  }

  function handleResize() {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setMediaQuery(mediaQuery.matches)
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Get current service price and name
      const currentService = transports.find(transport => transport.id === activeTransportType)
      const serviceName = currentService.text

      // Submit to stripe
      await submitStripe(activeTransportType, serviceName, total, loading, setLoading)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting the form. Please try again.')
    }
  }

  useEffect(() => {
    // Handle resize
    window.addEventListener('resize', handleResize)
    handleResize()

    // Load initial data
    const loadInitialData = async () => {
      try {
        const [apiHotels, apiTransports, apiAirbnbMunicipalities] = await Promise.all([
          getHotels(),
          getTransports(),
          getAirbnbMunicipalities()
        ])

        setHotels(apiHotels)
        setFormData(prev => ({ ...prev, hotel: apiHotels[0].value }))

        setTransports(apiTransports)
        const initialTransport = apiTransports[0]
        setActiveTransportPrice(initialTransport.price)
        setTotal(initialTransport.price)

        setAirbnbMunicipalities(apiAirbnbMunicipalities)
        setFormData(prev => ({ ...prev, airbnbMunicipality: apiAirbnbMunicipalities[0].value }))
      } catch (error) {
        console.error('Error loading initial data:', error)
        alert('Error loading form data. Please refresh the page.')
      }
    }

    loadInitialData()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Update total when relevant values change
  useEffect(() => {
    if (airbnbMunicipalities.length === 0 || hotels.length === 0) {
      return
    }
    
    let multiplier = activeTransportType === "Arriving,Departing" ? 2 : 1
    let total = activeTransportPrice

    if (formData.hotel === "Airbnb") {
      const municipality = airbnbMunicipalities.find(m => m.value === formData.airbnbMunicipality)
      total += municipality.price * multiplier
    } else {
      const hotel = hotels.find(h => h.value === formData.hotel)
      total += hotel.price * multiplier
    }

    setTotal(total)
  }, [formData.hotel, formData.airbnbMunicipality, activeTransportPrice, airbnbMunicipalities, hotels])

  function getArraivingDepartingForm() {
    const activeForms = activeTransportType.split(",")
    const fieldsets = []

    for (let title of activeForms) {
      const direction = title === "Departing" ? t('transportation.form.from') : t('transportation.form.in')
      const prefix = title.toLowerCase()

      fieldsets.push(
        <Fieldset title={t(`form.${prefix}`)} key={title}>
          <legend className="title text-xl uppercase mb-3"></legend>
          <Input
            label={t(`form.${prefix}Date`)}
            type='date'
            name={`${prefix}Date`}
            handleUpdate={handleInputChange}
            value={formData[`${prefix}Date`]}
            error={errors[`${prefix}Date`]}
          />
          <Input
            label={t(`form.${prefix}Time`, { direction })}
            type='time'
            name={`${prefix}Time`}
            handleUpdate={handleInputChange}
            value={formData[`${prefix}Time`]}
            error={errors[`${prefix}Time`]}
          />
          <Input
            label={t('transportation.form.airline')}
            type='text'
            name={`${prefix}Airline`}
            placeholder={t('transportation.form.airlinePlaceholder')}
            handleUpdate={handleInputChange}
            value={formData[`${prefix}Airline`]}
            error={errors[`${prefix}Airline`]}
          />
          <Input
            label={t('transportation.form.flightNumber')}
            type='text'
            name={`${prefix}Flight`}
            placeholder={t('transportation.form.flightNumberPlaceholder')}
            handleUpdate={handleInputChange}
            value={formData[`${prefix}Flight`]}
            error={errors[`${prefix}Flight`]}
          />
          <FormText
            text={t('transportation.form.flightInfoNote', { prefix, direction })}
          />
        </Fieldset>
      )
    }

    return fieldsets
  }

  // Generate passenger options
  const maxPassenger = 8
  const passengersData = Array.from({ length: maxPassenger }, (_, i) => {
    const num = i + 1
    return {
      value: `${num}`,
      label: `${num} ${num === 1 ? 'passenger' : 'passengers'}`
    }
  })

  return (
    <section className="buy-form container" id="buy">
      <Subtitle text={t('transportation.form.transportationOptions')} />

      <form onSubmit={handleSubmit} className="mx-auto">
        <TransportTypes
          handleUpdateType={handleUpdateType}
          activeTransportType={activeTransportType}
          transports={transports}
        />

        <div className="fields w-5/6 mx-auto grid gap-10" style={{ 
          gridTemplateColumns: mediaQuery ? "repeat(1, 1fr)" : 
            activeTransportType === "Arriving,Departing" ? "repeat(3, 1fr)" : "repeat(2, 1fr)" 
        }}>
          <Fieldset title={t('transportation.form.personalInfo')}>
            <Input
              label={t('transportation.form.name')}
              placeholder={t('transportation.form.namePlaceholder')}
              type='text'
              name='name'
              handleUpdate={handleInputChange}
              value={formData.name}
              error={errors.name}
            />
            <Input
              label={t('transportation.form.lastName')}
              placeholder={t('transportation.form.lastNamePlaceholder')}
              type='text'
              name='lastName'
              handleUpdate={handleInputChange}
              value={formData.lastName}
              error={errors.lastName}
            />
            <Select
              label={t('transportation.form.passengers')}
              name='passengers'
              handleUpdate={handleInputChange}
              options={passengersData}
              activeOption={formData.passengers}
            />
            <FormText text={t('transportation.form.maxPassengers')} />
            <Select
              label={t('transportation.form.hotelOrAirbnb')}
              name='hotel'
              handleUpdate={handleInputChange}
              options={hotels}
              activeOption={formData.hotel}
            />

            {formData.hotel === 'Airbnb' && (
              <>
                <Select
                  label={t('transportation.form.resortDestination')}
                  name='airbnbMunicipality'
                  handleUpdate={handleInputChange}
                  options={airbnbMunicipalities}
                  activeOption={formData.airbnbMunicipality}
                  error={errors.airbnbMunicipality}
                />
                <Input
                  label={t('transportation.form.airbnbAddress')}
                  placeholder={t('transportation.form.airbnbAddressPlaceholder')}
                  type='text'
                  name='airbnbAddress'
                  handleUpdate={handleInputChange}
                  value={formData.airbnbAddress}
                  error={errors.airbnbAddress}
                />
              </>
            )}
          </Fieldset>

          {getArraivingDepartingForm()}
        </div>

        <p className="total text-center text-2xl w-full block mt-10">
          {t('transportation.form.total')}
          <span className="px-2 font-bold">
            {total}.00 USD
          </span>
        </p>
        <button 
          type="submit" 
          disabled={loading}
          className="no-collect w-48 mx-auto mt-10 block bg-blue border-blue border-2 text-gold py-3 text-2xl font-bold cursor-pointer rounded-xl transition-all duration-300 hover:rounded-3xl hover:bg-white hover:text-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('transportation.form.processing') : t('transportation.form.buyNow')}
        </button>
      </form>
    </section>
  )
}