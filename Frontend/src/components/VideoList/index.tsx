import React, { useEffect, useState } from 'react'
import { getOtherPageVideo } from './service';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, message } from 'antd';

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

const VideoList: React.FC<any> = (props: { category: string }) => {
  const { category } = props;
  const [data, setData] = useState<UserItem[]>([]);
  const [videoQueue, setVideoQueue] = useState<any[]>([]);

  const appendVideos = (data: any) => {
    setVideoQueue([...videoQueue, ...data]);
  }

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    getOtherPageVideo(category).then((res: any) => {
      appendVideos(res?.data.data);
    });
    appendData();
  }, [])

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <>
      <List>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item: UserItem) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  )
}

export default VideoList