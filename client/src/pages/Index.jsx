import axios from "axios";
import { useEffect, useState } from "react";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { useLocation } from "react-router-dom";
import { setMessage } from "../utils/notification";
import { Store } from "react-notifications-component";

export default function Index() {


    return (
        <div>
            <div>
                This is the index page
            </div>
        </div>
        

    )

}