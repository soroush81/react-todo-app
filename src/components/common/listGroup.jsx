import React from 'react'
import { ListSubheader, List, ListItem, ListItemText, ListItemIcon, Typography, Box, Divider } from '@material-ui/core';

const ListGroup = ({ items, title, onItemSelect, textProperty, valueProperty, selectedItem }) => {
    return (
        <>
            <List component="nav" aria-labelledby="nested-list-subheader"
                subheader={
                    <>
                        <ListSubheader component="div" id="nested-list-subheader">
                            <Typography variant="h6">{title}</Typography>
                            <Box m={2} />
                        </ListSubheader>
                        <Divider />
                    </>
                }
            >
                {items.map(item => (
                    <>
                        {console.log(item[valueProperty])}
                        <ListItem button selected={selectedItem === item} key={Math.random()} onClick={() => onItemSelect(item)}>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ fontSize: "0.6rem" }} type="caption">{item[textProperty]}</Typography>} />
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>

        </>
    )
};


ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
export default ListGroup;
