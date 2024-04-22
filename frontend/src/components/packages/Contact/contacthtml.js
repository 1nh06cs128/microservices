
// < !DOCTYPE html >
//     <html>
//         <head>
//             <title>Page Title</title>
//             <style>
//                 body {
//                     background: #f0f0f5;
//                 font-size: .9rem;
//     }
//                 div {
//                     margin: 10px;
//     }

//                 div.detailsContainer, div.leftContainer, .rightContainer {
//                     display: flex;
//     }
//   	div.detailsContainer > div {
//                     flex: 1;
//     }
//     div.detailsContainer > div > div{
//                     flex: 1;
//     }
//     .departmentContainer > div {
//                     margin: 0;
//                 border: 1px solid red;
//     }
// 	.departmentContainer > p > input {
//                     height: 20px;
//                 width: 100%;
//     }
//                 div.termsContainer {
//                     margin: 0px;
//     }
// 	div.termsContainer > p {
//                     display: inline-block;
//     }
//     .termsContainer > p:nth-child(1) {
//                     float: left;
// 	}
//     .termsContainer > button {
//                     float: right;
//     }
//             </style>


//         </head>
//         <body>
//             <section class="contactPane">
//                 <div class="topContainer">
//                     <h1>
//                         Contact
//                     </h1>
//                     <p> Got any questions? Let's talk about it </p>
//                 </div>

//                 <div class="detailsContainer">
//                     <div class="leftContainer">
//                         <div class="addressContainer">
//                             <h3>
//                                 Office
//                             </h3>
//                             <p> 359 Hidden Valley Road, NY </p>
//                         </div>
//                         <div class="emailContainer">
//                             <h3>
//                                 Contacts
//                             </h3>
//                             <p> hello@gmail.com </p>
//                         </div>
//                     </div>
//                     <div class="rightContainer">
//                         <div class="departmentContainer">
//                             <div>
//                                 <span><strong>Department: </strong></span>
//                                 <input type="radio" id="radio1" name="support" value="support">
//                                     <label for="radio1">Support</label>

//                                     <input type="radio" id="radio2" name="sales" value="sales">
//                                         <label for="radio2">Sales</label>
//                                     </div>
//                                     <p><input placeholder="Subject" /></p>
//                                     <p><input placeholder="Name" /></p>
//                                     <div class="termsContainer">
//                                         <input type='checkbox' />
//                                         <span><strong>I agree to the Terms and Conditions.</strong></span>
//                                         <button>Start</button>
//                                     </div>
//                             </div>
//                         </div>
//                     </div>
//             </section>
//         </body>
//     </html>
