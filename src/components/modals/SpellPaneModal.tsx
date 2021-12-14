import React, { Dispatch, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Dropdown, DropdownButton, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Spell } from '../../types/Spell';
import { isSpellList, SpellList } from '../../types/SpellList';
import '../../css/SpellPaneModal.css';

enum SpellFilterGroup {
    SCHOOL='School',
    CLASS='Class'
}

const defaultSpellList: SpellList = {
    count: 0,
    next: null,
    previous: null,
    results: []
};

export function SpellPaneModal({show, setShow}: {show: boolean, setShow: Dispatch<React.SetStateAction<boolean>>}) {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [uniqueClasses, setUniqueClasses] = useState<string[]>([]);
    const [_uniqueSchools, setUniqueSchools] = useState<string[]>([]);

    useEffect(() => {
        const asyncWrapper = async () => setSpells(await fetchSpells(setUniqueClasses, setUniqueSchools));
        asyncWrapper();
    }, []);

    function classFilterHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        return;
    }

    return (
        <Modal id='spell-modal' size='lg' backdrop='true' show={show}>
            <ModalHeader>
                Spell List
                <Button variant='close' onClick={() => setShow(false)}/>
            </ModalHeader>
            <ModalBody>
                <div className='filter-row'>
                    <FilterDropdown
                        title={SpellFilterGroup.CLASS}
                        addFilterHandler={classFilterHandler}
                        options={Array.from(uniqueClasses)}/>
                </div>
                <div className='spell-list'>
                    {spells.map(spell => {
                        return <SpellListing key={spell.name} spell={spell}/>;
                    })}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setShow(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

function SpellListing({spell}: {spell: Spell}) {
    return (
        <Col className='spell-list-entry'>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <div className='spell-header'>
                            <div className='spell-header-main'>{spell.name}</div>
                            <div className='spell-header-sub'>{spell.school}, {spell.level}</div>
                        </div>
                    </Card.Title>
                    <div>{spell.desc}</div><br/><div>{spell.higher_level}</div>
                    <ListGroup>
                        <ListGroupItem>
                            {spell.casting_time !== '' && <div className='spell-info'>Casting time: {spell.casting_time}</div>}
                            {spell.dnd_class !== '' && <div className='spell-info'>Class(es): {spell.dnd_class}</div>}
                            {spell.duration !== '' && <div className='spell-info'>Duration: {spell.duration}</div>}
                            {spell.range !== '' && <div className='spell-info'>Range/Area: {spell.range}</div>}
                            {spell.components !== '' && <div className='spell-info'>Components: {spell.components}</div>}
                            {spell.material !== '' && <div className='spell-info'>Materials: {spell.material}</div>}
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup>
                        <Button variant='success'>Add to spellbook</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        </Col>
    );
}

async function fetchSpells(
    setUniqueClasses: React.Dispatch<React.SetStateAction<string[]>>,
    setUniqueSchools: React.Dispatch<React.SetStateAction<string[]>>
): Promise<Spell[]> {
    let tempSpellList: SpellList = {...defaultSpellList};
    let spells: Spell[] = [];
    let pageNo = 1;
    const uniqueClasses = new Set<string>();
    const uniqueSchools = new Set<string>();

    do {
        const response = await fetch(`https://api.open5e.com/spells/?page=${pageNo++}`, {
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
    } while (tempSpellList.next !== null);

    spells.forEach(spell => {
        spell.dnd_class.split(',').forEach(dnd_class => uniqueClasses.add(dnd_class.trim()));
        uniqueSchools.add(spell.school);
    });

    setUniqueClasses(Array.from(uniqueClasses));
    setUniqueSchools(Array.from(uniqueSchools));
    return spells;
}

function FilterDropdown({options, title, addFilterHandler}: {
    options: string[], title: string, addFilterHandler: React.MouseEventHandler<HTMLButtonElement>
}) {
    const [_activeFilters, _setActiveFilters] = useState<string[]>([]);

    return (
        <DropdownButton title={title}>
            {options.map(option => {
                return <Dropdown.Item onClick={addFilterHandler} key={option}>{option}</Dropdown.Item>;
            })}
        </DropdownButton>
    );
}
