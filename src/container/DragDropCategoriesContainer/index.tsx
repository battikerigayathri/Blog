"use client"
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import {
    TreeView, TreeViewDragClue, processTreeViewItems,
    moveTreeViewItem, TreeViewDragAnalyzer, TreeViewItemDragOverEvent, TreeViewItemDragEndEvent, TreeViewItemClickEvent, TreeViewCheckChangeEvent
} from '@progress/kendo-react-treeview';
import '@progress/kendo-theme-default/dist/all.css';
import { useLazyQuery } from '@/hook';
import { serverFetch } from '@/action';
import { useRouter } from 'next/navigation';

const DragDropCategoriesContainer = () => {
    const dragClue = useRef<any>();
    const dragOverCnt = useRef<number>(0);
    const isDragDrop = useRef<boolean>(false);
    const [tree, setTree] = useState<TreeViewDataItem[]>(treeData);
    const [initialTree, setInitialTree] = useState<TreeViewDataItem[]>(treeData);
    const [expand, setExpand] = useState({ ids: [], idField: 'text' });
    const [selected, setSelected] = useState({ ids: [], idField: 'text' });
    const [getCategories, { data, loading, error }] = useLazyQuery(serverFetch);
    const [updateCategories, updateCategoriesResponse] = useLazyQuery(serverFetch);
    const router = useRouter();

    useEffect(() => {
        getCategories(
            `query ListCategorys($where: whereCategoryInput) {
                listCategorys(where: $where) {
                  docs {
                    id
                    name
                    status
                    subCategory {
                      id
                      name
                      status
                      subCategory {
                        id
                        name
                        status
                        subCategory {
                            id
                            name
                            status
                            createdOn
                            updatedOn
                          }
                        createdOn
                        updatedOn
                      }
                      createdOn
                      updatedOn
                    }
                    createdOn
                    updatedOn
                  }
                }
              }`,
            {
                "where": {
                    "parent": {
                        "is": null
                    }
                }
            },
            {
                cache: "no-store"
            }
        )
    }, [])


    useEffect(() => {
        if (data && data?.listCategorys?.docs) {
            const category: TreeViewDataItem[] = getTreeData(data?.listCategorys?.docs);
            setTree(category)
            setInitialTree(category);
        }
    }, [data, loading, error])

    useEffect(() => {
        console.log(tree);


    }, [tree])

    function getMaxDepthOfTree(): number {
        let maxDepth = 0;

        function traverse(node: TreeViewDataItem, depth: number) {
            if (node.items && node.items.length > 0) {
                node.items.forEach(child => traverse(child, depth + 1))
            }
            maxDepth = Math.max(maxDepth, depth);
        }

        tree.forEach(child => traverse(child, 1));

        return maxDepth;
    }

    function handleSaveTree() {

        const maxDepth: number = getMaxDepthOfTree();
        if (maxDepth > 4) {
            alert("Maximum 4 levels of category tree is only allowed");
            return;
        }
        const diffCategoryObj = _.omitBy(tree, (value: any, key: any) => {
            return _.isEqual(value, initialTree[key]);
        })
        const updateInput = getUpdateArray(Object.keys(diffCategoryObj).map((key: any) => tree[key]));



        updateCategories(
            `mutation UpdateCategorys($input: [updateCategoryInput!]!) {
                updateCategorys(input: $input) {
                  id
                }
              }`,
            {
                "input": updateInput
            },
            {
                cache: "no-store"
            }
        )
    }

    useEffect(() => {
        if (updateCategoriesResponse.data) {
            router.replace('/admin/dashboard/category');

        }
    }, [updateCategoriesResponse.data, updateCategoriesResponse.error, updateCategoriesResponse.loading])


    function getUpdateArray(categories: any): any[] {
        const updateArray: any[] = [];

        function findParent(category: any, parentId: any) {
            updateArray.push({
                id: category.id,
                parent: parentId
            });

            if (category.items) {
                category.items.forEach((item: any) => {
                    findParent(item, category.id);
                });
            }
        }

        categories.forEach((category: any) => {
            findParent(category, undefined);
        });

        return updateArray;
    }
    function getTreeData(categories: any[]): TreeViewDataItem[] {

        return categories?.map((cat: any): any => {
            const treeData: TreeViewDataItem = {
                text: cat.name,
                id: cat.id,
                expanded: true,
            }
            treeData.items = cat?.subCategory?.length > 0 ? getTreeData(cat?.subCategory) : undefined;
            return treeData;
        })
    }

    const getClueClassName = (event: any) => {
        const eventAnalyzer = new TreeViewDragAnalyzer(event).init();
        const { itemHierarchicalIndex: itemIndex } = eventAnalyzer.destinationMeta;

        if (eventAnalyzer.isDropAllowed) {
            switch (eventAnalyzer.getDropOperation()) {
                case 'child':
                    return 'k-i-plus';
                case 'before':
                    return itemIndex === '0' || itemIndex.endsWith(`${SEPARATOR}0`) ?
                        'k-i-insert-up' : 'k-i-insert-middle';
                case 'after':
                    const siblings = getSiblings(itemIndex, tree);
                    const lastIndex = Number(itemIndex.split(SEPARATOR).pop());

                    return lastIndex < siblings.length - 1 ? 'k-i-insert-middle' : 'k-i-insert-down';
                default:
                    break;
            }
        }

        return 'k-i-cancel';
    }
    const onItemDragOver = (event: TreeViewItemDragOverEvent) => {
        dragOverCnt.current++;
        dragClue.current.show(event.pageY + 10, event.pageX, event.item.text, getClueClassName(event));
    }

    const onItemDragEnd = (event: TreeViewItemDragEndEvent) => {
        isDragDrop.current = dragOverCnt.current > 0;
        dragOverCnt.current = 0;
        dragClue.current.hide();

        const eventAnalyzer = new TreeViewDragAnalyzer(event).init();

        if (eventAnalyzer.isDropAllowed) {
            const updatedTree: any = moveTreeViewItem(
                event.itemHierarchicalIndex,
                tree,
                eventAnalyzer.getDropOperation() || 'child',
                eventAnalyzer.destinationMeta.itemHierarchicalIndex
            );
            setTree(updatedTree);
        }
    }
    const onItemClick = (event: TreeViewItemClickEvent) => {
        if (!isDragDrop.current) {
            let ids: any = selected.ids.slice();
            const index = ids.indexOf(event.item.id);

            index === -1 ? ids.push(event.item.id) : ids.splice(index, 1);
            setSelected({ ids, idField: 'id' });
        }
    }
    const onExpandChange = (event: TreeViewCheckChangeEvent) => {
        let ids: any = expand.ids.slice();
        const index = ids.indexOf(event.item.text);

        index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
        setExpand({ ids, idField: 'text' });
    }


    return (
        <div className='flex w-full justify-center items-center flex-col gap-4'>
            <h1 className='text-xl font-bold'>
                Category Tree Builder
            </h1>
            <div className='px-10 py-6 border-2 border-gray-900'>
                <TreeView
                    size="large"
                    draggable={true} onItemDragOver={onItemDragOver} onItemDragEnd={onItemDragEnd}
                    data={processTreeViewItems(
                        tree, { expand: expand, select: selected }
                    )}
                    expandIcons={true} onExpandChange={onExpandChange} onItemClick={onItemClick}
                />
                <TreeViewDragClue ref={dragClue} />
            </div>

            <div className='mt-4'>
                <button className='bg-blue-800 text-white px-6 py-1.5 rounded-lg' onClick={handleSaveTree}>Save</button>
            </div>
        </div>
    );
}


export default DragDropCategoriesContainer



interface TreeViewDataItem {
    text: string,
    id: string,
    expanded?: boolean,
    checked?: boolean,
    selected?: boolean,
    items?: TreeViewDataItem[]
}

function getSiblings(itemIndex: string, data: TreeViewDataItem[]) {
    let result = data;

    const indices = itemIndex.split(SEPARATOR).map(index => Number(index));
    for (let i = 0; i < indices.length - 1; i++) {
        result = result[indices[i]].items || [];
    }

    return result;
}

const SEPARATOR = '_';
const treeData: TreeViewDataItem[] = [{
    text: 'Loading...', expanded: true, id: "123"
}
];
