import React from 'react';
import type { NextPage } from 'next'

interface Props {
    id: number,
    title: string;
    completed: boolean;
    onDelete: any;
    onConfirm: any;
}

const ListCard: NextPage<Props> = (props) => {

    const { id, title, completed, onDelete, onConfirm } = props

    return (
        <div style={styles.item as React.CSSProperties}>
            <p>{title}</p>
            <div style={styles.actionContainer as React.CSSProperties}>
                {completed ? <p>✅</p> : null}
                <button onClick={onDelete.bind(this, id)}>Delete</button>
                <button onClick={onConfirm.bind(this, id)}>Details</button>
            </div>
        </div>

    );
};

const styles = {
    item: {
        width: '100%',
        padding: '0.5rem',
        border: '1px solid whitesmoke',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    actionContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}


export default ListCard;
