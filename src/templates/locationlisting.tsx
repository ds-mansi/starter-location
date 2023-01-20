// /**
//  * This is an example of how to create a template that makes use of streams data.
//  * The stream data originates from Yext's Knowledge Graph. When a template in
//  * concert with a stream is built by the Yext Sites system, a static html page
//  * is generated for every corresponding (based on the filter) stream document.
//  *
//  * Another way to think about it is that a page will be generated using this
//  * template for every eligible entity in your Knowledge Graph.
//  */

// import {
//     GetHeadConfig,
//     GetPath,
//     GetRedirects,
//     HeadConfig,
//     Template,
//     TemplateConfig,
//     TemplateProps,
//     TemplateRenderProps,
//   } from "@yext/pages";
//   import * as React from "react";
//   import Banner from "../components/banner";
//   import Header from "../components/header";
//   import Footer from "../components/footer";
//   import Details from "../components/details";
//   import Hours from "../components/hours";
//   import List from "../components/list";
//   import PageLayout from "../components/page-layout";
//   import StaticMap from "../components/static-map";
//   import Favicon from "../public/yext-favicon.ico";
//   import axios from "axios";
//   import "../index.css";
//   // 
//   /**
//    * Required when Knowledge Graph data is used for a template.
//    */
//   export const config: TemplateConfig = {
//     stream: {
//       $id: "location-listingpage",
//       // Specifies the exact data that each generated document will contain. This data is passed in
//       // directly as props to the default exported function.
//       fields: [
//         "name",
//         "address",
//         "c_commonlocation.name",
//         "c_commonlocation.id"
//       ],
//       // Defines the scope of entities that qualify for this stream.
//       filter: {
//         entityTypes: ["ce_relation"],
//       },
//       // The entity language profiles that documents will be generated for.
//       localization: {
//         locales: ["en"],
//         primary: false,
//       },
//     },
//   };
  
//   /**
//    * Defines the path that the generated file will live at for production.
//    *
//    * NOTE: This currently has no impact on the local dev path. Local dev urls currently
//    * take on the form: featureName/entityId
//    */
//   export const getPath: GetPath<TemplateProps> = ({ document }) => {
//     return "index.html"
//   };
  
//   /**
//    * Defines a list of paths which will redirect to the path created by getPath.
//    *
//    * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
//    * a new deploy.
//    */
//   export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//     return [`index-old/${document.id.toString()}`];
//   };
  
//   /**
//    * This allows the user to define a function which will take in their template
//    * data and produce a HeadConfig object. When the site is generated, the HeadConfig
//    * will be used to generate the inner contents of the HTML document's <head> tag.
//    * This can include the title, meta tags, script tags, etc.
//    */
//   export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
//     relativePrefixToRoot,
//     path,
//     document,
//   }): HeadConfig => {
//     return {
//       title: document.name,
//       charset: "UTF-8",
//       viewport: "width=device-width, initial-scale=1",
//       tags: [
//         {
//           type: "meta",
//           attributes: {
//             name: "description",
//             content: document.description,
//           },
//         },
//         {
//           type: "link",
//           attributes: {
//             rel: 'icon',
//             type: 'image/x-icon',
//             href: Favicon
//           },
//         }
//       ],
//     };
//   };
  
//   /**
//    * This is the main template. It can have any name as long as it's the default export.
//    * The props passed in here are the direct stream document defined by `config`.
//    *
//    * There are a bunch of custom components being used from the src/components folder. These are
//    * an example of how you could create your own. You can set up your folder structure for custom
//    * components any way you'd like as long as it lives in the src folder (though you should not put
//    * them in the src/templates folder as this is specific for true template files).
//    */
//   const Locationlisting: Template<TemplateRenderProps> = ({
//     relativePrefixToRoot,
//     path,
//     document,
//   }) => {
//     const {
//       name,
//       c_commonlocation
//     } = document;
  
  
//   //console.log(c_uRL1,"c_uRL1");
//     return (
//       <>
//       <Header/>

//       <div className="list" style={{fontSize:"50px", marginLeft:"30px"}}>
//         <h1>Location List</h1>
//     </div>
//     <div style={{fontSize:"30px",margin:"30px"}}>
//         {c_commonlocation.map((item)=>
//             <a href={`../location/${item.id}`}>{item.name}</a>
//         )}
//     </div>    
      
//       <div style={{backgroundColor:"#e9e7e7"}}>
//         <div style={{fontSize:"50px",textAlign:"center",marginBottom:"20px",fontFamily:'"Times New Roman", Times, serif'}}>
//           {name}
//         </div>
//         <div className="" style={{height:"450px",width:"450px",float:"right", margin:"25px"}}>
//          <img src={c_locationAddress.image.url}></img>
//         </div>
//         <div className="col-sm-6" style={{}}>
//           <div style={{display:"block",fontSize:"50px", marginLeft:"25px"}}>
//             {address.line1}{address.line2}{address.city}{address.postalCode}
//           </div>
      
//           <div style={{margin:"25px", fontSize:"30px"}}>
//             {c_locationAddress.description}
//           </div>
//         </div>
//         <div style={{fontSize:"30px",textAlign:"center",marginBottom:"100px",color:"red",textDecoration:"underline",fontWeight:"bold",paddingBottom:"70px"}}>
//           <a href={c_locationAddress.url}>LINK</a> 
//         </div>
//       <div>
        
//     </div>
        
//     </div>
      
//       <Footer/>
//       </>
//     );
//   };
  
//   export default Locationlisting;
   