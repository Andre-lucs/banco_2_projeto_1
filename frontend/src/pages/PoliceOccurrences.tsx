import {Link} from 'react-router-dom'
import {OccurrenceInfoPreview} from '../components/OccurrenceInfoPreview';
import { useOccurrence } from '../hooks/useOccurrences';
import { useState } from 'react';

export function PoliceOccurrences () {
    
    const {occurrences} = useOccurrence();
    const [searchOccurrence, setSearchOccurrence] = useState("");
    const [filteredOccurrences, setFilteredOccurrences] = useState(occurrences);

    function filterOccurrences(value: string) {
        setSearchOccurrence(value); 
        setFilteredOccurrences(() => {
          return occurrences.filter(({ title }) =>
            title.toUpperCase().includes(value.toUpperCase())
          );
        });
      }

    return (
        <div className='flex flex-col justify-center w-full items-center pt-4'>
            <div className='w-full flex justify-center gap-3'>
                <input 
                    type="text" 
                    value={searchOccurrence}
                    placeholder="Buscar ocorrência" 
                    className='h-10 p-3 w-1/2 rounded border border-black'
                    onChange={(ev) => filterOccurrences(ev.target.value)}/>
                <Link to='criar-ocorrencia'>
                    <button 
                        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300'>
                        Adicionar
                    </button>
                </Link>
                
            </div>

            <div className='pt-4 pb-4 w-full flex flex-col items-center max-h-[300px] overflow-y-auto gap-3'>
                {occurrences && occurrences.length > 0? (
                    filteredOccurrences.map(({ title, type, dateTime, id }) => (
                        <OccurrenceInfoPreview title={title} key={id} type={type} id={id} date={dateTime} />
                    ))
                ) : (
                    <p>Sem ocorrências registradas</p>
                )}
            </div>
        </div>
    )
}