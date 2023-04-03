import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Fade, Slide } from "react-reveal";
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// YOUR_TEMPLATE_ID YOUR_PUBLIC_KEY
const Contact = (props) => {

  const form = useRef();
  if (!props.data) return null;
  const { street, city, state, zip } = props.data.address;
  const { name } = props.data.name;
  const { phone } = props.data.phone;
  const { message } = props.data.contactmessage;
  
const showAlert = () =>{
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your message was sent, Thank you!',
    showConfirmButton: false,
    timer: 1500
  })
  }

  const showAlertError = () =>{
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error message',
      showConfirmButton: false,
      timer: 1500
    })
    }

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm(
        "service_62qfd8i",
        "template_0qchi2g",
        form.current,
        "64_WGqpoT2clEk-mQ"
      )
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
          showAlert(result.text)
        },
        (error) => {
          console.log(error.text);
          showAlertError(error.text)
        }
      );
  };

  return (
    <section id="contact">
      <Fade bottom duration={1000}>
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>
      </Fade>

      <div className="row">
        <Slide left duration={1000}>
          <div className="eight columns">
            <form
              ref={form}
              onSubmit={sendEmail}
            >
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    name="user_name"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="Email"
                    defaultValue=""
                    size="35"
                    name="user_email"
                  />
                </div>

                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    name="user_subject"
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    cols="50"
                    rows="15"
                    name="message"
                  ></textarea>
                </div>

                <div>
                  <button type="submit" className="submit" value="Send">
                    Submit
                  </button>
                  <span id="image-loader">
                    <img alt="" src="images/loader.gif" />
                  </span>
                </div>
              </fieldset>
            </form>

            <div id="message-warning"> Error message</div>
            <div id="message-success">
              <i className="fa fa-check"></i>Your message was sent, Thank you!
              <br />
            </div>
          </div>
        </Slide>

        <Slide right duration={1000}>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}, {state} {zip}
                <br />
                <span>{phone}</span>
              </p>
            </div>
          </aside>
        </Slide>
      </div>
    </section>
  );
};

export default Contact;
