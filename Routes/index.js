import { useState } from 'react';
import { View } from 'react-native';

import AuthRoutes from './auth.routes';

function Routes(){
    const loading = false;
    const signed = false;
     const [user, setUser] = useState(null);

    return(
        signed ? <View></View> : <AuthRoutes/>
    )
}

export default Routes;