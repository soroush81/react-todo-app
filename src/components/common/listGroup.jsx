import React from 'react'
import { ListSubheader, List, ListItem, ListItemText, Typography, Box, Divider } from '@material-ui/core';

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
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem button selected={selectedItem === item} onClick={() => onItemSelect(item)}>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ fontSize: "0.6rem" }} type="caption">{item[textProperty]}</Typography>} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>

        </>
    )
};


ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: 'id'
}
export default ListGroup;
