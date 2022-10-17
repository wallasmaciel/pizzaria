import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { ItemProps } from "../../pages/Order"
import { Feather } from '@expo/vector-icons'

type ListItemProps = ItemProps & {
    deleteItem: (item_id: string) => void
}

export function ListItem({ id, product_id, name, amount, deleteItem }: ListItemProps) {
    function handleDeleteItem() {
        deleteItem(id)
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.item }>{ amount } - { name }</Text>

            <TouchableOpacity onPress={ handleDeleteItem }>
                <Feather name='trash-2' color='#FF3F4b' size={ 25 } />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101026',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4, 
        borderWidth: 0.3, 
        borderColor: '#8a8a8a'
    },
    item: {
        color: '#FFF'
    }
})