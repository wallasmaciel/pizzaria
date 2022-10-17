import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CategoryProps, ProductProps } from '../../pages/Order'

type ModalPickerProps = {
    handleCloseModal: () => void,
    options: CategoryProps[] | ProductProps[]
    selectedItem: (item: CategoryProps | ProductProps) => void
}

// Pegar as dimensoes da tela do usuario
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default function ModalPicker({ handleCloseModal, options, selectedItem }: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item)
        handleCloseModal()
    }

    return (
        <TouchableOpacity style={ styles.container } onPress={ handleCloseModal }>
            <View style={ styles.content }>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    { options.map((item, index) => (
                        <TouchableOpacity key={ index } style={ styles.options } onPress={ () => onPressItem(item) }>
                            <Text style={ styles.item }>
                                { item?.name }
                            </Text>
                        </TouchableOpacity>
                    )) }
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4
    },
    options: {
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },
    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#101026'
    }
})