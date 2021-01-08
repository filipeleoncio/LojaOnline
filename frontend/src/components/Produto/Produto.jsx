import React from 'react';
import { Button, Grid, GridColumn, GridRow, Item, Image } from 'semantic-ui-react';

export const Produto = ( { produtos } ) => {
    if ( produtos ) {
        return (
            <Grid >
                { produtos.map( ( prod, index ) => (
                    <GridRow key={ index }>
                        <GridColumn width={ 3 }>
                            <Image src={ prod.imgSrc } fluid />
                        </GridColumn>
                        <GridColumn width={ 8 }>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header>{ prod.nome }</Item.Header>
                                        <Item.Description>{ prod.descricao }</Item.Description>
                                        <Item.Meta>Preço: { prod.preco }</Item.Meta>
                                        <Item.Extra>Quantidade disponível: { prod.quantidade }</Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </GridColumn>
                        <GridColumn width={ 5 }>
                            <Button>Adicionar ao carrinho</Button>
                        </GridColumn>
                    </GridRow>
                ) )
                }
            </Grid>
        )
    }
    return null;
}
