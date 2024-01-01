import _ from "lodash"
import React, { useRef, useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import "./styles.scss";

export default function ProductSuggestion(props) {
    const { data, detailProduct } = props;
    console.log(data, "xxxxxxxxxxxxxxxxxxxxxxxxxx")
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3" onClick={(e) => detailProduct(product)}>
                <div className="mb-3 flex justify-content-center">
                    <img src={`${product.image}`} alt={product.name} className="w-6 shadow-2" style={{ height: "200px" }} />
                </div>
                <div>
                    <h4 className="mb-1 render-text">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div> */}
                </div>
            </div>
        );
    };
    return (
        <div>
            <div class="relative md:p-5">
                <div class="static font-bold p-4 text-gray-800 border-bottom-1 border-gray-300">
                    <div class="static md:absolute bottom-0 right-auto border-round" style={{ "min-width": "200px", "min-height": "70px", left: "44%" }}>
                        <div className="render-content px-5 text-xl font-light text-orange-300">
                            Gợi ý sản phẩm
                        </div>
                    </div>
                </div>
            </div>
            <Carousel
                value={data || []}
                numScroll={1}
                numVisible={5}
                responsiveOptions={responsiveOptions}
                itemTemplate={productTemplate}
                circular
            />
        </div>
    )
}
