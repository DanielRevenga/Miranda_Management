import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ButtonInfo, ButtonSuccess } from '../styles/components/Button';
import { ItemTypes } from './ItemTypes';

export function BookingCard ({ id, index, first_name, last_name, order_date, check_in, 
    check_out, room_type_number, room_type_type, special_request, moveCard }) {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <tr ref={ref} style={{opacity}} data-handler-id={handlerId}>
            <td></td>
			<td>{first_name} {last_name} </td>
            <td>{order_date}</td>
            <td>{check_in}</td>
            <td>{check_out}</td>
            <td><ButtonInfo fontSize={1}>View Notes</ButtonInfo></td>
            <td>{room_type_type} - {room_type_number}</td>
            <td><ButtonSuccess>Booked</ButtonSuccess></td>
            <td><i class="fas fa-ellipsis-v"></i></td>
		</tr>
        );
};
