import React from "react";
import { useModal } from "../../context/Modal";
import './AboutModal.css'
function AboutModal(){
    const {closeModal} = useModal()
    return(
        <div className="about-section">
            <div onClick={closeModal} className="close-button hov"><i class="fa-solid fa-x"></i></div>
            <img id="about-logo" src="https://i.imgur.com/DK2auRU.png" alt="keeper-logo"/>
            <div className="content">
                <img id="profile-image" src="https://i.imgur.com/3MRH2wb.jpg" alt="Gal_Atias"/>
                <p>Kepper is a web application designed for small business owners who want to streamline their bookkeeping and team management tasks. With Keeper, users can store customer data, create estimates and invoices, manage services, and invite team members to join their business account as employees. The app was created by Gal Atias, a former small construction business owner who recognized the need for a more efficient way to manage his business operations. Keeper offers a user-friendly interface and a range of features that help businesses stay organized and focused on their goals.</p>
            </div>
            <div className="links-div">
            <a href="https://github.com/atias6051" target="_blank" rel="noreferrer"><i class="fa-brands fa-github"></i><span>GitHub</span></a>
            <a href="https://www.linkedin.com/in/gal-atias/" target="_blank" rel="noreferrer"><i class="fa-brands fa-linkedin"></i><span>LinkedIn</span></a>
            <a href="https://www.linkedin.com/in/gal-atias/" target="_blank" rel="noreferrer"><i class="fa-regular fa-id-card"></i><span>Portfolio</span></a>
            </div>
        </div>
    )
}

export default AboutModal
