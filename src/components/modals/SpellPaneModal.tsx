import React, { Dispatch, useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Spell } from '../../types/Spell';
import { isSpellList, SpellList } from '../../types/SpellList';
// import { SpellList } from '../types/SpellList';

export function SpellPaneModal({show, setShow}: {show: boolean, setShow: Dispatch<React.SetStateAction<boolean>>}) {
    const defaultSpellList: SpellList = {
        count: 0,
        next: null,
        previous: null,
        results: []
    };
    const [spellList, setSpellList] = useState<SpellList>(defaultSpellList);

    useEffect(() => {
        const fetchData = async () => {
            let tempSpellList: SpellList = {...spellList};
            let spells: Spell[] = [];
            let pageNo = 1;
            do {
                const response = await fetch(`https://api.open5e.com/spells/?page=${pageNo}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data && isSpellList(data)) {
                    tempSpellList = data;
                    spells = spells.concat(data.results);
                }
                pageNo++;
                console.log(spells);
            } while (tempSpellList.next !== null);
            setSpellList({...spellList, results: spells});
        };
        fetchData();
    }, []);

    return (
        <Modal show={show}>
            <ModalHeader>Spell List</ModalHeader>
            <ModalBody>
                <div>
                    Data is {spellList.results.map(spell => {
                        return <div key={spell.name}>{spell.name}</div>;
                    })}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setShow(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

