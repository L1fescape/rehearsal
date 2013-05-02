//
//  ViewController.m
//  Firebase Test
//
//  Created by Andrew on 3/8/13.
//  Copyright (c) 2013 Andrew. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@property (nonatomic, strong) Firebase *firebase;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Init Firebase
    [self setupFirebase];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setupFirebase {
    // Create a reference to a Firebase location
    self.firebase = [[Firebase alloc] initWithUrl:@"https://fbase-test.firebaseio.com/"];
    
    // Read data and react to changes
    [[self.firebase child:@"People"] on:FEventTypeChildAdded doCallback:^(FDataSnapshot *snap) {
        NSLog(@"Value : %@ %@", [snap val], [snap name]);
    }];
}

- (void)submitTouched {
    // Write data to Firebase
    [[[[self.firebase child:@"People"] child:self.name.text] child:@"name"] set:self.name.text];
    [[[[self.firebase child:@"People"] child:self.name.text] child:@"location"] set:self.location.text];
}

@end
