"use client"

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, useDisclosure } from '@heroui/react';
import { useCallback, useState } from 'react';
import EmblaCarousel from '../Carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { Expedition } from '@/app/actions/GetExpeditions';
import Image from 'next/image';

const OPTIONS: EmblaOptionsType = { loop: false, watchDrag: false }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

type DreamBoardProps = {
    expeditions : Expedition[]
}

export default function DreamBoard(props : DreamBoardProps) {
    const {expeditions} = props;

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedExpedition, setSelectedExpedition] = useState<Expedition>(expeditions?.[0]);


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
                            expeditions={expeditions}
                        />
                        <Tabs 
                            aria-label="Options"
                            classNames={{tabList: "w-full"}}
                        >
                            <Tab key="dreams" title="Dreams">
                                <Table>
                                    <TableHeader>
                                        <TableColumn>Dream</TableColumn>
                                        <TableColumn>Description</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <DreamList 
                                                expeditions={expeditions}
                                                setSelectedExpedition={setSelectedExpedition}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <DreamDescription
                                                expedition={selectedExpedition}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    </TableBody>
                                </Table>
                            </Tab>
                            <Tab key="cats" title="Cats">
                                <CatTable/>
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

function DreamDescription(props : {expedition? : Expedition}) {
    const {expedition} = props;

    if (!expedition) return <></>
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <p className="text-md">{expedition.name}</p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{expedition.description}</p>
                <Image
                    src={`/${expedition.mapIcon}`}
                    alt={"mapIcon"}
                    width={100}
                    height={100}
                />
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex flex-col">
                    <p className="text-md">Max Cats: {expedition.maxCats}</p>
                    <p className="text-md">Enemies: {expedition.enemies.length}</p>
                </div>
            </CardFooter>
        </Card>
    );
}

function DreamList(props : {expeditions: Expedition[], setSelectedExpedition : (expedition : Expedition) => void}) {
    const {expeditions, setSelectedExpedition} = props

    return (
        <Listbox 
            aria-label="Dynamic Actions"
            items={expeditions}
            selectedKeys={[expeditions?.[0].name ?? ""]}
        >
            {(item) => (
            <ListboxItem
                key={item.name}
                onPress={() => setSelectedExpedition(item)}
            >
                {item.name}
            </ListboxItem>
            )}
        </Listbox>
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
