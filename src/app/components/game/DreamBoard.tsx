"use client"

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, useDisclosure } from '@heroui/react';
import { useCallback, useEffect, useState } from 'react';
import EmblaCarousel from '../Carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { Expedition } from '@/app/actions/GetExpeditions';
import Image from 'next/image';

const OPTIONS: EmblaOptionsType = { loop: false, watchDrag: false }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

type DreamBoardProps = {
    expeditions: Expedition[]
}

export default function DreamBoard(props: DreamBoardProps) {
    const { expeditions } = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedExpedition, setSelectedExpedition] = useState<Expedition>(expeditions?.[0]);
    const [acceptedExpeditions, setAcceptedExpeditions] = useState<Expedition[]>(new Array<Expedition>());

    return (
        <>
            <Button
                className="absolute top-[220px] left-[120px] text-center"
                onPress={onOpen}>Open Dream Board
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='max-w-2xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selectedExpedition?.name}</ModalHeader>
                            <ModalBody>
                                <EmblaCarousel
                                    options={OPTIONS}
                                    selectedExpedition={selectedExpedition}
                                    setSelected={setSelectedExpedition}
                                    expeditions={acceptedExpeditions}
                                />
                                <Tabs
                                    aria-label="Options"
                                    classNames={{ tabList: "w-full" }}
                                >
                                    <Tab key="dreams" title="Dreams">
                                        <Table>
                                            <TableHeader>
                                                <TableColumn>Dream</TableColumn>
                                                <TableColumn>Description</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className='align-top'>
                                                        <DreamList
                                                            expeditions={expeditions}
                                                            setSelectedExpedition={setSelectedExpedition}
                                                            accepted={acceptedExpeditions}
                                                            selected={selectedExpedition}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <DreamDescription
                                                            expedition={selectedExpedition}
                                                            accepted={acceptedExpeditions}
                                                            setAccepted={setAcceptedExpeditions}
                                                            setSelected={setSelectedExpedition}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Tab>
                                    <Tab key="cats" title="Cats">
                                        <CatTable />
                                    </Tab>
                                </Tabs>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

type DreamDescriptionProps = {
    expedition?: Expedition,
    accepted: Expedition[],
    setAccepted: (e: Expedition[]) => void
    setSelected: (e: Expedition) => void
}
function DreamDescription(props: DreamDescriptionProps) {
    const { expedition, accepted, setAccepted, setSelected } = props;

    const accept = () => {
        if (!expedition) return
        let newAccepted = accepted.concat(expedition)
        setAccepted(newAccepted)
        setSelected(expedition)
    }

    const revoke = () => {
        if (!expedition) return
        let newAccepted = accepted.filter(e => e.name !== expedition.name);
        setAccepted(newAccepted)
        if (accepted.length > 0) setSelected(accepted[accepted.length - 2])
    }

    if (!expedition) return <></>
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <p className="text-md text-center">{expedition.name}</p>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-row justify-between">
                    <div className='flex-1 text-orange-500'>
                        <p className="text-md">Max Cats</p>
                        <p className="text-md">Enemies</p>
                        <br></br>
                        <p>Description</p>
                    </div>
                    <div className='flex-2'>
                        <p className="text-md">{expedition.maxCats}</p>
                        <p className="text-md">{expedition.enemies.length}</p>
                        <br></br>
                        <p className="pr-1">{expedition.description}</p>
                    </div>
                    <div className='w-[100px] h-[100px] flex items-center'>
                        <Image
                            src={`/${expedition.mapIcon}`}
                            alt={"mapIcon"}
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className='flex-row-reverse'>
                {
                    expedition && accepted.includes(expedition) ?
                        <Button className='bg-red-700'
                            onPress={revoke}
                        >
                            Revoke
                        </Button>
                        :
                        <Button className='bg-red-700'
                            onPress={accept}
                        >
                            Accept
                        </Button>
                }
            </CardFooter>
        </Card>
    );
}

type DreamListProps = {
    expeditions: Expedition[],
    setSelectedExpedition: (expedition: Expedition) => void,
    accepted: Expedition[],
    selected: Expedition,
}

function DreamList(props: DreamListProps,) {
    const { expeditions, setSelectedExpedition, accepted, selected } = props

    return (
        <div>
            <p>{selected.name}</p>
            <Listbox
                aria-label="Dynamic Actions"
                items={expeditions}
                className="justify-start"
                key={accepted.length}
                selectionMode='single'
                selectedKeys={new Set([selected.name])}
            >
                {(item) => (
                    <ListboxItem
                        key={item.name}
                        onPress={() => setSelectedExpedition(item)}
                        className={selected.name === item.name ? "bg-amber-500" : ""}
                    >
                        {item.name}
                    </ListboxItem>
                )}
            </Listbox>
        </div>
    );
}

function CatTable() {
    const selectedColor = "primary";

    return (
        <div className="flex flex-col gap-3">
            <Table
                aria-label="Example static collection table"
                color={selectedColor}
                selectionMode="multiple"
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Zoey Lang</TableCell>
                        <TableCell>Technical Lead</TableCell>
                        <TableCell>Paused</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Jane Fisher</TableCell>
                        <TableCell>Senior Developer</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>William Howard</TableCell>
                        <TableCell>Community Manager</TableCell>
                        <TableCell>Vacation</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
