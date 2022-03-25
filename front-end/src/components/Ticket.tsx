import { createStitches} from '@stitches/react';
import TicketModel from '../models/TicketModel';
type Props = {
    ticket : TicketModel;
}

function Ticket({ticket} : Props) {

  return (
      <TickectBody >
          <span style={{padding:'4px'}}>código: {ticket.codigo}</span>
          <TickectNumberBody>{ticket.numeros.split(',').map(n => <TickectNumber >{n}</TickectNumber>)}</TickectNumberBody>
      </TickectBody>
  )
}



const {styled, css}  = createStitches({
    media: {
      bp1: '(max-width: 640px)',
      bp2: '(max-width: 768px)',
      bp3: '(max-width: 1024px)',
    },
  });

const TickectBody = styled('div', {
    color: 'white',
    padding: '4px',
    display: 'flex',
    flexDirection: 'column',
    width: '288px',
    height: '320px',
    borderRadius:'6px',
    backgroundColor: 'black',
    marginLeft: '6px'
  });

  
const TickectNumberBody = styled('div', {
    color: 'black',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '288px',
    height: '320px',
  });
  
  const TickectNumber = styled('div', {
    margin: 0,
    width: '56px',
    height: '56px',
    border: '1px solid black',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  });

  
export default Ticket;