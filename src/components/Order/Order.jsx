import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { getOrders, updateOrderStatus } from "../../Service/OrderService";
import Dropdown from 'react-dropdown';
import {over} from 'stompjs'
import SockJS from "sockjs-client/dist/sockjs"
import { v4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./Order.module.css"
// import "./Dropdown.css"
import AuthService from "../../Service/AuthService";



function Order({data:{id, name, status, comment, price}}) {

    const onChangeStatus = (status) => {
        updateOrderStatus(id, status.value);
    }

    const options = [
        'ACCEPTED', 'DECLINED', 'CANCELED', 'DONE'];

    return (
     <div key={id} className={`card mb-3 ${styles.order}`} style={{maxWidth: "500px"}}>
        <div className="row g-0">
            <div className={styles.column}>
                    <div className="card-body">
                        <h2>{name}</h2>
                        <p>{comment}</p>
                        <h4>{price}</h4>
                        <Dropdown className={`btn btn-primary ${styles.button}`} ClassName='myMenuClassName' options={options} onChange={onChangeStatus} value={status}/>
                    </div>
            </div>
        </div>
     </div>   
    )
}

export function Orders() {

    var stompClient = null;

    let navigate = useNavigate();

    const isAuthenticated = () => {
        const authentication = AuthService.getAuthentication();

        if (authentication===null){
            navigate("/");
        }
        if (authentication != null && authentication.user.roles.includes("USER")){
            navigate("/create-order");
        }
    }

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        isAuthenticated();
        connect();
        getOrders().then((result) => setOrders(result));    
    }, []);

    const connect = () => {
        const Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/order', onReceived)
    }

    const onReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        setOrders((prevState) => [payloadData, ...prevState]);
    }

    const onError = (err) => {
        console.log(err);
    }

    return (
        <div className={`container-fluid ${styles.cont}`}>
                {orders?.map((item) => {return (
                    <div key={v4()} className={`col-xs-1 ${styles.col}`}>
                        <Order data={item}/>
                    </div>
                    )
                }
                )}
        </div>
    )
}