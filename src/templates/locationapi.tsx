/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Banner from "../components/banner";
import Header from "../components/header";
import Footer from "../components/footer";
import Details from "../components/details";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import Favicon from "../public/yext-favicon.ico";
import axios from "axios";
import "../index.css";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      "address",
      "hours",
      "c_locationAddress"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: 'icon',
          type: 'image/x-icon',
          href: Favicon
        },
      }
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    address,
    hours,
    c_locationAddress
  } = document;
  const[data,setData]=React.useState([]);
  React.useEffect(()=>{
    fetch("https://liveapi-sandbox.yext.com/v2/accounts/me/entities?api_key=cd821ad28d2c3ed02f101d32a7fc0578&v=20230110&entityTypes=location&entityTypes=location")
    .then((res)=>res.json())
    .then((json)=>{
      setData(json.response.entities)
    })
  },[]); 


console.log(data);
  return (
    <>
    <Header/>
    <Banner/>
    {data.map((res:any)=>{
      console.log(res,"res")
      return(
        <>
        <div style={{marginTop:"10px",backgroundColor:"#FBDDF7"}}>
        <div style={{fontSize:"50px",backgroundColor:"#DB7093",paddingLeft:"50px"}}>
          {res.name}
        </div>
        <div>
          <div style={{height:"300px",width:"300px",float:"right",margin:"30px 0px 10px 10px "}}>
            <img src={res.c_locationAddress.image.url}></img>
          </div>
          <div style={{width:"40%",padding:"30px 40px 50px 50px"}}>
            <div style={{fontWeight:"bold"}}>
              {res.address.line1}{res.address.line2}{res.address.city}{res.address.postalCode}
            </div>
          </div>
          <div style={{marginLeft:"40%",width:"33.3%",marginTop:"-10%"}}>
            <div style={{marginLeft:"15%",marginBottom:"5%"}}>
              <Hours hours={hours}/>
            </div>
          </div>
          <div style={{width:"40%",padding:"30px 40px 50px 50px",marginTop:"-18%"}}>
            <div style={{paddingTop:"20px"}}>
              {res.c_locationAddress.description}
            </div>
            <div style={{fontSize:"30px",textAlign:"center",color:"blue",textDecoration:"underline",fontWeight:"bold",paddingBottom:"70px"}}>
              <a href={res.c_locationAddress.url}>LINK</a> 
            </div>
          </div>
       </div>
       
       </div>
       
   </> )})}
    <Footer/>
    </>
  );
};

export default Location;
 