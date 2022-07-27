import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, 
    ImageBackground,
    ActivityIndicator
} from 'react-native'
import React,{useEffect, useState} from 'react'
import { LIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from '../constants/StyleColor';

import CartItem from '../components/CartItem'
import Maps from '../components/Maps'
import masques from '../../assets/images/masques.png'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import { useDispatch, useSelector } from 'react-redux'
import {AddOrder} from '../Redux/Slices/OrderSlice'
import { ScrollView } from 'react-native-gesture-handler';


const CartScreen = ({navigation, route}) => {
    const PriceSaladtotal = route.params.priceSaladtotal
    const [userId, setUserId] = useState(null)
    const [dp, setDP] = useState(null)

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);
    const {isLoading, order} = useSelector((state) => state.order);
    

    const updateNaw3Order = (item) =>{
        setDP(item)
    }

    useEffect(()=>{
        
    },[order])


    useEffect(()=>{
      
    },[cart, dp])
    
    const subTotal = () => {
        return cart.reduce((price, item) => price + item.price * item.quantity, 0);
    }

    // const products = route.params;.
    const HandleMakeAnOrder = () =>{
          const orderData = {
            userId : user._id,
            products: cart,
            Delivery_Puckup: dp == 1 ? 'Delivery' : 'Puck up',
            totalPrice: ( subTotal() + PriceSaladtotal ).toFixed(2)
        }

        if(dp == null){
            alert('Choisissez le type de commande')
        }
        else{
            dispatch(AddOrder(orderData))
            if( orderData ){
                const id = orderData._id
                navigation.navigate('confimerOrder', {id})
            }
        }
    }

  return (
    <View style={styles.container}>
       <ImageBackground source={masques} style={{flex: 1, padding: 20}}>
           <ScrollView style={{}}>
              
                <View>
                    <Text style={styles.title}>
                        Menu
                    </Text>

                   {
                       cart.length > 0 ?
                       <CartItem 
                       products={cart}
                       subTotal= {subTotal()}
                       />
                       :
                       null
                   }
                    {
                        PriceSaladtotal ?
                        <View style={{marginBottom: 15}}>
                        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>Salade: 
                            <Text style={{color: PRIMARY_COLOR}}>
                                 {cart.length > 0 ? "+": null} {PriceSaladtotal} DH
                            </Text>
                        </Text>
                    </View>
                    :
                    null
                    }
                </View>

                <View style={{
                     flexDirection:'row',
                     marginBottom: 20
                 }}>
                     <TouchableOpacity style={{...styles.button,
                     backgroundColor: dp == 1 ? LIGHT_COLOR :  SECONDARY_COLOR,
                     borderWidth: 2, borderColor: dp == 1 ? LIGHT_COLOR : PRIMARY_COLOR}}
                     onPress={()=>{updateNaw3Order(1)}}>
                         <Text style={{color: dp == 1 ? WHITE :  PRIMARY_COLOR}}>Delivery</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={{...styles.button,
                     backgroundColor: dp == 2 ? LIGHT_COLOR :  SECONDARY_COLOR,
                     borderWidth: 2, borderColor: dp == 2 ? LIGHT_COLOR : PRIMARY_COLOR}}
                         onPress={()=>{updateNaw3Order(2)}}
                     >
                         <Text style={{color: dp == 2 ? WHITE :  PRIMARY_COLOR}}>Puck up.</Text>
                     </TouchableOpacity>
                </View>


                    {
                        dp == 2 || dp == null ?
                        null 
                        :
                        <View>
                            <Maps />
                        </View>
                        
                    } 

           </ScrollView>

           <View style={styles.bottomView}>
                     <TouchableOpacity style={styles.bottomButton}
                     onPress={()=>{HandleMakeAnOrder()}}>
                         
                         <Text style={{color:WHITE, fontWeight: 'bold', fontSize: 18}}>
                            { !isLoading ? "Make an Order" : <ActivityIndicator size="small" color={WHITE} /> }
                         </Text>
                    
                     </TouchableOpacity>
                 </View>

       </ImageBackground>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        fontSize: 20,
        marginBottom: 10
      },
    button:{
        padding: 10,
        borderRadius: 20,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      
    },
    bottomView: {
        // width: windowWidth,
        justifyContent:'center', 
        alignItems:'center',
        padding: 10
        // width: windowWidth,
        // padding: 20, 
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'absolute', 
        // bottom: 0, 
    },
    bottomButton:{
        padding: 15,
        borderRadius: 10,
        width: '100%',
        backgroundColor:LIGHT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#52006A',
  
    }
})

