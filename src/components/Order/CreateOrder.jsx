import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { saveOrder } from "../../Service/OrderService"
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./CreateOrder.module.css"
import AuthService from "../../Service/AuthService";


export function CreateOrder(){

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [price, setPrice] = useState(0);

    let navigate = useNavigate();

    const isAuthenticated = () => {
        const authentication = AuthService.getAuthentication();

        if (authentication===null){
            navigate("/");
        }
        if (authentication != null && authentication.user.roles.includes("ADMIN")){
            navigate("/order");
        }
    }

    useEffect(() => {
      isAuthenticated();
    }, [])
    

    const OnChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const OnChangeComment = (e) => {
        const comment = e.target.value;
        setComment(comment);
    }

    const OnChangePrice = (e) => {
        const price = e.target.value;
        setPrice(price);
    }

    const createOrder = () => {
        saveOrder({name, comment, price});
    }

    return (
        <Form onSubmit={createOrder} className="col-md-12">
          <Form.Group className={styles["mb-3"]}>
            <Form.Label className="label">Title</Form.Label>
            <Form.Control className={styles.input} type="text" onChange={OnChangeName}/>
          </Form.Group>
    
          <Form.Group className={styles["mb-3"]}>
            <Form.Label className="label">Comment</Form.Label>
            <Form.Control className={styles.input} as="textarea" onChange={OnChangeComment}/>
          </Form.Group>
          
          <Form.Group className={styles["mb-3"]}>
            <Form.Label className="label">Price</Form.Label>
            <Form.Control className={styles.input} id={styles.price} type="number" onChange={OnChangePrice}/>
          </Form.Group>
          <br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
      ); 
} 