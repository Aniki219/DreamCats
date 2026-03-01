"use client"

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, useDisclosure } from '@heroui/react';
import { useState } from 'react';
import EmblaCarousel from '../Carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { Expedition } from '@/app/actions/GetExpeditions';

const OPTIONS: EmblaOptionsType = { loop: false, watchDrag: false }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

type DreamBoardProps = {
    expeditions : Expedition[]
}

export default function DreamBoard(props : DreamBoardProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {expeditions} = props;

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
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                        <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
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
                                            <DreamList expeditions={expeditions}/>
                                        </TableCell>
                                        <TableCell>
                                            <DreamDescription/>
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

function DreamDescription() {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">HeroUI</p>
                    <p className="text-small text-default-500">heroui.com</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
}

function DreamList(props : {expeditions: Expedition[]}) {
    const {expeditions} = props

    const ListboxWrapper = ({children} : {children: any}) => (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
    );

    return (
        <ListboxWrapper>
            <Listbox aria-label="Dynamic Actions" items={expeditions}>
                {(item) => (
                <ListboxItem
                    key={item.name}
                >
                    {item.name}
                </ListboxItem>
                )}
            </Listbox>
        </ListboxWrapper>
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
