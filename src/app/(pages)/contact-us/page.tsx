import {ContactHero, ContactForm, BranchOffices} from '@/components/contact'
import { FAQs } from '@/components/home'
const ContactUs = ()=>{
    return(
        <>
          <ContactHero/>
          <ContactForm/>
          <FAQs />
          <BranchOffices/>
        </>
    )
}

export default ContactUs