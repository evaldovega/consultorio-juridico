import React from 'react'

import {useHistory,Link} from 'react-router-dom'
import {Card,CardDeck,Container} from "react-bootstrap"
import { ACCESS_TOKEN_NAME, MODULES } from '../constants/apiContants';
import Footer from '../components/Footer';
import HeaderPage from 'components/Header';

import Policy from 'components/Policy';
import Slogan from 'components/Slogan';
import {Chunk} from 'utils'


const Home=()=>{
    
    const history=useHistory()
    const logout=()=>{
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      history.replace('/login')
    }
   
    const modulesChunk = Chunk(MODULES,3).map(m=>{
      const relleno = 3-m.length;
      console.log({relleno})
      for(let i=0;i<relleno;i++){
        m.push({})
      }
      return m
    });

    return (
      <>
      <HeaderPage showLogo={false} />
        <div
          className="landing-header"
          style={{ backgroundImage: "url(/images/landing.jpg)" }}
        >
          <div className="info">
            <img src="images/logow.png" style={{ width: "50%" }} />
            <div className="divider" style={{ marginTop: 37 }}></div>
            <Slogan/>
          </div>
        </div>

        <Container>
          <div className="section-title">
            <h1>Módulos</h1>
            <h2>
              Escoge el módulo según tu necesidad.
            </h2>
          </div>
          {
            modulesChunk.map((modules,index)=>(
            <CardDeck key={index} style={{marginBottom:24}}>
              {modules.map((m, index2) => {
                if(!m.name){
                  return (<Card className="empty-card" />)
                }
                return (<Policy policy={m.policies} key={index2}>
                 
                    <Card
                      className="animate__animated animate__fadeInLeft"
                      style={{ animationDelay: `${index+index2 * 0.02}s`}}
                    >
                       <Link to={m.url} className="link-card">
                      <Card.Img variant="top" src={m.img}/>
                      <Card.Body>
                      <Card.Title>{m.name}</Card.Title>
                        <Card.Text>Descripción</Card.Text>
                      </Card.Body>
                      </Link>
                    </Card>
                  
                </Policy>)
                
                })}
            
            </CardDeck>))
          }
        </Container>

        <Footer />
      </>
    );
}

export default Home