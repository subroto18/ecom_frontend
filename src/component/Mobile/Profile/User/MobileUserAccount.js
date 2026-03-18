import React, {Component, Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Link from "next/link";
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../../services/common";

class MobileUserAccount extends Component {

    render() {

        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat

        const walletBalance = this.props.walletData.map(pd => {
            return pd.walletBalance
        })

        return (
            <Fragment>
                <Container>
                    <div className="mobileUserAccount">
                        <div className="mobileUserInfoDiv text-center">

                            <p className="userAccountName">{this.props.name}</p>
                            <p className="userAccountEmail">{this.props.email}</p>
                            <p className="userAccountPhone">{this.props.phone}</p>

                            {this.props.walletActivation !== 0 &&

                                <Fragment>
                                    {currencySymbolFormat === 1 ?
                                        <p className="AccountWalletBalance">Wallet
                                            Balance: {this.props.walletData.length > 0 ? this.props.onCurrencyFormat(walletBalance) : onCurrencyFormat(0)}{defaultCurrency}</p> :
                                        <p className="AccountWalletBalance">Wallet
                                            Balance: {defaultCurrency}{this.props.walletData.length > 0 ? onCurrencyFormat(walletBalance) : onCurrencyFormat(0)}</p>
                                    }
                                </Fragment>

                            }

                            <div className="userAccountIcons">
                                <Link href="/my-orders" className="userAccountIcon">
                                    <i className="fas fa-file-invoice icon-green"/>
                                    <Link href="/my-orders" className="iconName">Orders</Link>
                                </Link>
                                <Link href="/profile" className="userAccountIcon">
                                    <i className="fas fa-user icon-red"></i>
                                    <p className="iconName">Profile</p>
                                </Link>
                                <Link href="/address" className="userAccountIcon">
                                    <i className="fas fa-map-marker-alt icon-blue"></i>
                                    <p className="iconName">Address</p>
                                </Link>
                                <Link href="/support-ticket" className="userAccountIcon">
                                    <i className="fas fa-comment-alt-lines icon-orange"></i>
                                    <p className="iconName">Support</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mobileUserAccountMenu mobileAccordianMenu">

                        <Accordion allowZeroExpanded preExpanded={['a', 'b']}>

                            {this.props.role === 2 &&
                                <Fragment>
                                    <AccordionItem uuid="a">
                                        <AccordionItemHeading className='addSubMenu'>
                                            <AccordionItemButton>
                                                <div className="userAccountIcon">
                                                    <i className="fas fa-shopping-bag mobileMenuIcon"/>
                                                    <span className="iconName">Manage Shop</span>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <ul className="profile-sub-menu mb-4">
                                                <Link href="/seller-products">
                                                    <li><i className="fas fa-box-full mobileMenuIcon"></i>Products</li>
                                                </Link>
                                                <Link href="/seller-digital-products">
                                                    <li><i className="fad fa-laptop mobileMenuIcon"></i>Digital Products
                                                    </li>
                                                </Link>
                                                <Link href="/seller-orders">
                                                    <li><i className="fas fa-file-invoice mobileMenuIcon"></i>Orders
                                                    </li>
                                                </Link>
                                                {this.props.couponActivation !== 0 &&
                                                    <Link href="/coupon">
                                                        <li><i className="fas fa-ticket-alt mobileMenuIcon"></i>Coupon
                                                        </li>
                                                    </Link>
                                                }
                                                <Link href="/product-reviews">
                                                    <li><i className="fas fa-star mobileMenuIcon"></i>Product Reviews
                                                    </li>
                                                </Link>
                                                <Link href="/shop-setting">
                                                    <li><i className="fas fa-cog mobileMenuIcon"></i>Shop Settings</li>
                                                </Link>
                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading className='addSubMenu'>
                                            <AccordionItemButton>
                                                <div className="userAccountIcon">
                                                    <i className="fas fa-comment-alt-exclamation mobileMenuIcon"/>
                                                    <span className="iconName">Request</span>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <ul className="profile-sub-menu mb-4">
                                                <Link href="/return-request">
                                                    <li><i className="fas fa-backward mobileMenuIcon"></i>Return Request
                                                    </li>
                                                </Link>
                                                <Link href="/replace-request">
                                                    <li><i className="fas fa-people-carry mobileMenuIcon"></i>Replace
                                                        Request
                                                    </li>
                                                </Link>
                                                <Link href="/refund-request">
                                                    <li><i className="fas fa-person-dolly mobileMenuIcon"></i>Refund
                                                        Request
                                                    </li>
                                                </Link>
                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading className='addSubMenu'>
                                            <AccordionItemButton>
                                                <div className="userAccountIcon">
                                                    <i className="fas fa-sack-dollar mobileMenuIcon"/>
                                                    <span className="iconName">Financial</span>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <ul className="profile-sub-menu mb-4">
                                                <Link href="/return-request">
                                                    <li><i className="fas fa-backward mobileMenuIcon"></i>Return Request
                                                    </li>
                                                </Link>
                                                <Link href="/replace-request">
                                                    <li><i className="fas fa-people-carry mobileMenuIcon"></i>Replace
                                                        Request
                                                    </li>
                                                </Link>
                                                <Link href="/refund-request">
                                                    <li><i className="fas fa-person-dolly mobileMenuIcon"></i>Refund
                                                        Request
                                                    </li>
                                                </Link>
                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading className='addSubMenu'>
                                            <AccordionItemButton>
                                                <div className="userAccountIcon">
                                                    <i className="fas fa-sack-dollar mobileMenuIcon"/>
                                                    <span className="iconName">Financial</span>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <ul className="profile-sub-menu mb-4">
                                                <Link href="/commission-history">
                                                    <li><i className="fas fa-history mobileMenuIcon"></i>Commission
                                                        history
                                                    </li>
                                                </Link>
                                                <Link href="/money-withdraw">
                                                    <li><i className="fas fa-money-check-alt mobileMenuIcon"></i>Money
                                                        withdraw
                                                    </li>
                                                </Link>
                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </Fragment>
                            }

                            <AccordionItem uuid="b">
                                <AccordionItemHeading>
                                    <AccordionItemButton>

                                        <i className="fas fa-file-invoice mobileMenuIcon"/>
                                        <span className="iconName">Orders</span>

                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <ul className="profile-sub-menu mb-4">
                                        <Link href="/my-orders">
                                            <li><i className="fas fa-file-invoice mobileMenuIcon"/>My Orders</li>
                                        </Link>
                                        <Link href="/my-returns">
                                            <li><i className="fas fa-backward mobileMenuIcon"/>My Returns</li>
                                        </Link>
                                        <Link href="/my-replaces">
                                            <li><i className="fas fa-people-carry mobileMenuIcon"/>My Replace</li>
                                        </Link>
                                        <Link href="/my-cancellation">
                                            <li><i className="fas fa-ban mobileMenuIcon"/>My Cancellations</li>
                                        </Link>
                                    </ul>
                                </AccordionItemPanel>
                            </AccordionItem>


                            <AccordionItem>
                                <Link href="/my-downloads" className="userAccountIcon">
                                    <AccordionItemHeading className='addSubMenu'>
                                        <AccordionItemButton>
                                            <i class="fas fa-download mobileMenuIcon"/>
                                            <span>My Downloads</span>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                </Link>
                            </AccordionItem>


                            <AccordionItem>
                                <Link href="/reviews">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <i className="fas fa-star mobileMenuIcon"></i>
                                            <span>My Reviews</span>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                </Link>

                            </AccordionItem>

                            <AccordionItem>
                                <Link href="/wishlist">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <i className="fas fa-heart mobileMenuIcon"/>
                                            <span>My Wishlist</span>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                </Link>

                            </AccordionItem>

                            {this.props.walletActivation !== 0 &&
                                <AccordionItem>
                                    <Link href="/my-wallet">
                                        <AccordionItemHeading className="noSubMenu">
                                            <AccordionItemButton>
                                                <i className="fas fa-wallet mobileMenuIcon"></i>
                                                <span>My Wallet</span>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                    </Link>

                                </AccordionItem>
                            }

                        </Accordion>


                    </div>
                </Container>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const name = state.userReducer.name;
    const email = state.userReducer.email;
    const phone = state.userReducer.phone;
    const walletData = state.walletReducer.walletData;
    const walletActivation = state.walletReducer.walletActivation;
    const role = state.userReducer.role;
    return {
        defaultCurrency,
        currencySymbolFormat,
        walletData,
        walletActivation,
        name,
        phone,
        email,
        role
    };
}

export default connect(mapStateToProps)(MobileUserAccount);



