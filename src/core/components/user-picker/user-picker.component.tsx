import React, { Component } from 'react';

import './user-picker.style.css';
import UserContainer from '../user-container/user-container.component';
import UserEntity from '../../entities/user.entity';
interface UserPickerProps {
    onSelect: (selectedUser: UserEntity) => void;
    padding?: string | number;
    delegates: UserEntity[];
}

class UserPicker extends Component<UserPickerProps> {
    _selectedIndex: number = 0;
    _scrollController: React.RefObject<HTMLDivElement> = React.createRef();

    indexes: number[] = [];
    constructor(props: UserPickerProps) {
        super(props);
        this._scrollController = React.createRef();
    }

    componentDidMount() {
        const scrollOffset = this._selectedIndex > 0
            ? this._selectedIndex * 65 - 65
            : this._selectedIndex * 65;

        if (this._scrollController.current) {
            this._scrollController.current.scrollLeft = scrollOffset;
        }
    }

    render() {


        return (

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                    width: '100px',
                    padding: this.props.padding ?? '0 0 0 0px',
                    height: 60,
                    alignItems: 'stretch', flexGrow: '1',

                }}
                ref={this._scrollController}
                className='client-picker'
            >
                {
                    Array.from({ length: this.props.delegates.length }, (_, index) => {
                        return (
                            <UserContainer
                                key={index}
                                isSelected={this._selectedIndex === index}
                                name={this.props.delegates[index].fullName!}
                                onPressed={() => {
                                    if (!(this._selectedIndex === index)) {
                                        this._selectedIndex = index;
                                        this.props.onSelect(this.props.delegates[index]);
                                        this.forceUpdate();
                                    }
                                }}
                            />
                        );
                    })}
            </div>
        );
    }
}

export default UserPicker;
